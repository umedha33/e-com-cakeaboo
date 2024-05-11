import React, { useEffect } from 'react';
import './CSS/FaqsPage.css';

const FaqsPage = () => {

  useEffect(() => {
    const faqItems = document.querySelectorAll('.faq-itms');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  }, []);

  return (
    <div className='faqs-page-container'>
      <div className='faqs-container'>
        <div className='faqs-header'>
          <div className='faqs-description'>
            Welcome to our FAQ page! Here, we've compiled answers to frequently asked questions about our delectable cakes, including details on flavors, customizations, delivery options, and pricing. Whether you're curious about our baking process or need assistance with placing an order, you'll likely find the information you need here. If you don't see your question listed, don't hesitate to contact us directly. We're here to ensure your cake experience with us is delightful from start to finish!
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>How do I place an order?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            You can place an order by visiting our website and selecting your desired cake from our menu. Then, proceed to checkout and follow the instructions to complete your order.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Can I customize my cake?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            Yes, we offer customization options for our cakes. You can specify details such as flavor, design, size, and any special decorations or messages you'd like.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Do you offer gluten-free options?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            Yes, we have gluten-free options available for customers with dietary restrictions or preferences. Please let us know about any allergies or special requirements when placing your order.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>What is your cancellation policy?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            Our cancellation policy allows for cancellations up to [number of days] days before the scheduled delivery or pickup date. Cancellations made within [number of days] days may incur a cancellation fee.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>How far in advance should I place my order?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            We recommend placing your order at least [number of days/weeks] in advance to ensure availability, especially during busy periods such as holidays or special occasions.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>What payment methods do you accept?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            We accept payment via credit/debit card, PayPal, and cash on delivery for local orders. Our online checkout system is secure and easy to use.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Do you offer cake decorating classes?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            Yes, we offer cake decorating classes for enthusiasts of all skill levels. Check our website or contact us for upcoming class schedules and registration details.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Can you accommodate special dietary restrictions?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            Yes, we can accommodate special dietary restrictions such as gluten-free, vegan, nut-free, and more. Please inform us of any dietary needs when placing your order.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>How far do you deliver?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            We deliver within a [number of miles/kilometers] radius of our store location. Delivery fees may vary based on the distance.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Do you provide cake stands or displays for events?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            Yes, we offer cake stands and displays for events such as weddings, birthdays, and other special occasions. Contact us to discuss your specific display needs.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>What is your policy on refunds or returns?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            We strive for customer satisfaction. If there are any issues with your order, please contact us immediately for assistance. Refunds or returns may be offered on a case-by-case basis.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Are your ingredients locally sourced or organic?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            We prioritize quality ingredients and source locally whenever possible. Our organic options are clearly labeled on our menu.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Can I request a rush order?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            Yes, we accommodate rush orders based on availability. Additional fees may apply for expedited processing and delivery.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Do you offer cake delivery on weekends or holidays?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            Yes, we offer cake delivery services on weekends and holidays. However, we recommend placing your order in advance to secure your preferred delivery date.
          </div>
        </div>

        <div className='faq-itms'>
          <div className='faq-question'>
            <span>Can you accommodate last-minute orders?</span>
            <span className='dropdown-icon'>&#9660;</span>
          </div>
          <div className='faq-answer'>
            We do our best to accommodate last-minute orders, depending on our current workload and availability. Contact us as soon as possible to discuss your order requirements.
          </div>
        </div>
      </div>
    </div>
  );

}

export default FaqsPage;
