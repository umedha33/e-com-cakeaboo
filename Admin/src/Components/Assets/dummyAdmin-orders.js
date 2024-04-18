import order1 from '../Assets/kidck-1.jpg'
import order2 from '../Assets/wedn-1.jpg'
import order3 from '../Assets/bday-1.jpg'
import order4 from '../Assets/kidck-2.jpg'


let dummyAdminOrders = [
    {
        orderID: 1,
        imageUrl: order1,
        orderTitle: "Naruto Kids Cake",
        isCustom: false,
        layerCount: 2,
        tierCount: 1,
        color: ["Yellow", "Black", "Brown"],
        flavor: "Chocolate",
        writing: "",
        comment: "",
        orderDate: "04/02/2024",
        deliveryDate: "04/10/2024",
        custName: "Nihal Kariyawasam",
        custPhone: "0722666900",
        custAddress: "170/B Heerassagala Road Kandy",
        quantity: 1,
        price: 8000,
        orderStatus: "Processing"
    },
    {
        orderID: 2,
        imageUrl: order2,
        orderTitle: "Floral 2 Tier Wedding Cake",
        isCustom: true,
        layerCount: 4,
        tierCount: 2,
        color: ["White", "Beige"],
        flavor: "Chocolate",
        writing: "U & N",
        comment: "More flowers would be great!",
        orderDate: "04/04/2024",
        deliveryDate: "04/14/2024",
        custName: "Senerath Dunusinghe",
        custPhone: "0777937158",
        custAddress: "190/A Mahenwatte Pitipana",
        quantity: 1,
        price: 12000,
        orderStatus: "Accepted"
    },
    {
        orderID: 3,
        imageUrl: order3,
        orderTitle: "Box Birthday Cake",
        isCustom: true,
        layerCount: 1,
        tierCount: 1,
        color: ["Green", "LightBlue"],
        flavor: "Chocolate",
        writing: "Happy birthday Arun",
        comment: "",
        orderDate: "04/06/2024",
        deliveryDate: "04/15/2024",
        custName: "Lakmini Kariyawasam",
        custPhone: "0713675823",
        custAddress: "110/E Hettimulla Kagalle",
        quantity: 1,
        price: 3500,
        orderStatus: "Order Placed"
    },
    {
        orderID: 4,
        imageUrl: order4,
        orderTitle: "Sunny Kids Cake",
        isCustom: false,
        layerCount: 1,
        tierCount: 1,
        color: ["White", "LightBlue"],
        flavor: "Chocolate",
        writing: "Happy birthday Arun",
        comment: "",
        orderDate: "04/07/2024",
        deliveryDate: "04/15/2024",
        custName: "Roshini Dunusinghe",
        custPhone: "0713675823",
        custAddress: "110/E Hettimulla Kagalle",
        quantity: 1,
        price: 3500,
        orderStatus: "Order Placed"
    },
];

export default dummyAdminOrders;
