import order1 from '../Assets/lvdtheme-1.jpg'
import order2 from '../Assets/kidck-1.jpg'

let dummyOrders = [
    {
        imageUrl: order1,
        details: 'Product 1 Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam libero quidem culpa voluptatum ad, debitis quia magni inventore, a corporis totam quam consequatur ab non est vitae reprehenderit nihil ut!',
        quantity: 2,
        price: 2000,
        deliveryDate: "10/04/2024",
        orderStatus: "Accepted"
    },
    {
        imageUrl: order2,
        details: 'Product 2 Description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur.',
        quantity: 1,
        price: 3500,
        deliveryDate: "12/04/2024",
        orderStatus: "Processing"
    },
    {
        imageUrl: order1,
        details: 'Product 3 Description debitis quia magni inventore, a corporis totam quam consequatur ab non est vitae reprehenderit nihil ut!',
        quantity: 2,
        price: 2000,
        deliveryDate: "20/04/2024",
        orderStatus: "On The Way"
    },
    {
        imageUrl: order2,
        details: 'Product 4 Description Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, soluta quas quaerat labore, nesciunt beatae dolor vero. Fugit dolore repellendus veniam ipsa.',
        quantity: 1,
        price: 3500,
        deliveryDate: "30/03/2024",
        orderStatus: "Delivered"
    },
];

export default dummyOrders;
