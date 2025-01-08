import psycopg2
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Define email settings (update these with your own configuration)
SMTP_SERVER = 'smtp.yourmailserver.com'
SMTP_PORT = 587
SMTP_USER = 'your_email@example.com'
SMTP_PASSWORD = 'your_password'

def send_payment_email(to_address, subject, body):
    """Send an email to the specified address."""
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

# Create a cursor to interact with the database
cur = conn.cursor()

# Query to find passengers who have not paid
cur.execute("""
    SELECT p.passenger_id, p.email
    FROM passengers p
    JOIN payments pay ON p.passenger_id = pay.passenger_id
    WHERE pay.status = 'Unpaid';
""")

# Fetch all unpaid passengers
unpaid_passengers = cur.fetchall()

# Send email reminders to each unpaid passenger
for passenger in unpaid_passengers:
    passenger_email = passenger[1]
    subject = "Payment Reminder"
    body = f"Dear passenger, we noticed that you haven't paid for your upcoming trip. Please make the payment to avoid any issues."
    send_email(passenger_email, subject, body)
    print(f"Sent reminder to {passenger_email}")

# Close the cursor and the database connection
cur.close()
conn.close()
