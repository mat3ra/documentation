# Payments

A "Payment" is executed every time a transfer is made from an Account and is added to its [balance](balance.md), in order to cover the required costs of performing the desired actions.

## Charges

An Account is not billed, or "Charged", until the completion of the corresponding computational task. At the moment of charging, the relevant amount of money associated with this computation is consequently transferred from the account-owned balance to Exabyte as a company. It is worth emphasizing that each computational job is charged separately by the platform.

## View Charges and Payments

Inspection of the complete list of all previously-made payments, and of all incurred charges, associated with an Account is rendered possible through the "Billing & Payments" option under the [Account Menu]({{ interface_url }}/ui/account-menu/) interface component, accessible from anywhere across the platform. This particular aspect of the User Interface is reviewed in the following [dedicated page]({{ interface_url }}/accounts/ui/charges-payments/).

## Payment Methods

### Card-based Payments

Payments can be executed through Credit/Debit Cards, by providing the relevant card information as outlined in the following [procedural instructions]({{ interface_url }}/accounts/accounting/payment-methods/).

### Wire-based Payments

For the Enterprise Accounts we naturally establish a different payment protocol:

 1. After receiving a payment from the customer, we make it available as a "Credit" payment method under the customer account.

 2. We charge the subscription fee to the payment method

 3. Account administrators will then be able to use this payment method to pay for compute allocation or any other resource costs

 For repeated payments the process is repeated correspondingly.
