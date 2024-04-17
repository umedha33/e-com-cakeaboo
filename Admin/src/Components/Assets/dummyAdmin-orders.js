import order1 from '../Assets/lvdtheme-1.jpg'
import order2 from '../Assets/kidck-1.jpg'

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
        orderDate: "02/04/2024",
        deliveryDate: "10/04/2024",
        custName: "Nihal Kariyawasam",
        custPhone: "0722666900",
        custAddress: "170/B Heerassagala Road Kandy",
        quantity: 1,
        price: 8000,
        orderStatus: "Accepted"
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
        deliveryDate: "12/04/2024",
        custName: "Senerath Dunusinghe",
        custPhone: "0777937158",
        custAddress: "190/A Mahenwatte Pitipana",
        quantity: 1,
        price: 12000,
        orderStatus: "Accepted"
    },
    {
        orderID: 3,
        imageUrl: order1,
        orderTitle: "Box Birthday Cake",
        isCustom: true,
        layerCount: 1,
        tierCount: 1,
        color: ["Green", "LightBlue"],
        flavor: "Chocolate",
        writing: "Happy birthday Arun",
        comment: "",
        orderDate: "05/04/2024",
        deliveryDate: "15/04/2024",
        custName: "Lakmini Kariyawasam",
        custPhone: "0713675823",
        custAddress: "110/E Hettimulla Kagalle",
        quantity: 1,
        price: 3500,
        orderStatus: "Accepted"
    },
];

export default dummyAdminOrders;
