# Contact Form Email Setup Instructions

The contact form is configured to send emails to: **khanshaharyar083@gmail.com**

## Current Setup
The form currently uses a mailto: fallback which opens the user's email client. For a better experience, you can set up one of these services:

## Option 1: Web3Forms (Recommended - Free & Easy)
1. Go to https://web3forms.com
2. Enter your email: khanshaharyar083@gmail.com
3. Get your free access key
4. In all HTML files, find this line:
   ```javascript
   const accessKey = 'YOUR_ACCESS_KEY';
   ```
5. Replace `YOUR_ACCESS_KEY` with your actual access key from Web3Forms

## Option 2: Formspree (Free)
1. Go to https://formspree.io
2. Sign up for a free account
3. Create a new form
4. Set the recipient email to: khanshaharyar083@gmail.com
5. Get your form ID
6. Update the form action in all HTML files

## Option 3: EmailJS (Free)
1. Go to https://www.emailjs.com
2. Sign up for a free account
3. Create an email service (Gmail, Outlook, etc.)
4. Create an email template
5. Get your Service ID, Template ID, and Public Key
6. Update the JavaScript in all HTML files with these credentials

## Files to Update
After getting your credentials, update these files:
- css/index.html
- css/solutions/consumer.html
- css/Resources/blog.html
- css/Resources/reports.html
- css/Resources/case-studies.html
- css/Resources/industry-rankings.html
- css/Resources/press-releases.html
- css/Resources/media-coverage.html
- css/industries/industry-beauty.html
- (And any other HTML files with the contact form)

## Testing
After setup, test the form by:
1. Filling out all required fields
2. Submitting the form
3. Checking khanshaharyar083@gmail.com for the email

