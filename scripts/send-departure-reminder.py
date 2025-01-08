import psycopg2
import select
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Define email settings (update these with your own configuration)
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SMTP_USER = 'kenangazwan@gmail.com'
SMTP_PASSWORD = 'jfgb ioqd hnee alah'

def send_departure_email(to_address, subject, body):
    msg = MIMEMultipart()
    msg['From'] = SMTP_USER
    msg['To'] = to_address
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Send the email via SMTP server
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, to_address, msg.as_string())

# Connect to the PostgreSQL database
conn = psycopg2.connect(
    dbname='postgres',
    user='postgres',
    password='1234',
    host='localhost',
    port='5432'
)

# Create a cursor and listen to the 'send_email' channel
cur = conn.cursor()
cur.execute('LISTEN send_email;')

print("Waiting for notifications on 'send_email'...")

try:
    while True:
        # Wait for a notification on the channel
        if select.select([conn], [], [], 5) == ([], [], []):
            print("Waiting for messages...")
        else:
            conn.poll()
            while conn.notifies:
                notify = conn.notifies.pop()
                print(f"Received notification: {notify.payload}")
                passenger_email = notify.payload
                
                # Now, send an email to the passenger
                subject = "Train Departure Reminder"
                body = f"Dear passenger, your train is departing in 3 hours. Please be on time."
                send_email(passenger_email, subject, body)

except KeyboardInterrupt:
    print("Exiting...")
finally:
    cur.close()
    conn.close()
