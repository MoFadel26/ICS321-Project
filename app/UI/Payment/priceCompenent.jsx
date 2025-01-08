"use client";
export default function PaymentCompenet({ prices }) {
  return (
    <div className="mt-6 grow sm:mt-8 lg:mt-0">
      <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Original price
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              ${prices[0]}
            </dd>
          </dl>
          {prices[1] > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Dependent Discount
              </dt>
              <dd className="text-base font-medium text-green-500">
                -${prices[1]}
              </dd>
            </dl>
          )}

          {prices[2] && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                Loyalty Discount
              </dt>
              <dd className="text-base font-medium text-green-500">
                -${prices[2]}
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
              Tax(15%)
            </dt>
            <dd className="text-base font-medium text-gray-900 dark:text-white">
              ${prices[3]}
            </dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt className="text-base font-bold text-gray-900 dark:text-white">
            Total
          </dt>
          <dd className="text-base font-bold text-gray-900 dark:text-white">
            ${prices[0] - prices[1] - prices[2] + prices[3]}
          </dd>
        </dl>
      </div>

      <div className="mt-6 flex items-center justify-center gap-8">
        <img
          className="h-8 w-auto dark:hidden"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
          alt=""
        />
        <img
          className="hidden h-8 w-auto dark:flex"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
          alt=""
        />
        <img
          className="h-8 w-auto dark:hidden"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
          alt=""
        />
        <img
          className="hidden h-8 w-auto dark:flex"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
          alt=""
        />
        <img
          className="h-8 w-auto dark:hidden"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
          alt=""
        />
        <img
          className="hidden h-8 w-auto dark:flex"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
          alt=""
        />
      </div>
    </div>
  );
}
