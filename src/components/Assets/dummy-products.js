import ck1 from '../Assets/kidck-1.jpg'
import ck2 from '../Assets/kidck-2.jpg'
import ck3 from '../Assets/bday-1.jpg'
import ck4 from '../Assets/bday-2.jpg'
import ck5 from '../Assets/wedn-1.jpg'
import ck6 from '../Assets/wedn-2.jpg'
import ck7 from '../Assets/lvdtheme-1.jpg'
import ck8 from '../Assets/lvdtheme-2.jpg'
import ck9 from '../Assets/fondnt-1.jpg'
import ck10 from '../Assets/fondnt-2.jpg'
import ck11 from '../Assets/buttercrm-1.jpg'
import ck12 from '../Assets/buttercrm-2.jpg'
import ck13 from '../Assets/frosted-1.jpg'
import ck14 from '../Assets/frosted-2.jpg'
import ck15 from '../Assets/whippedcrm-1.jpg'
import ck16 from '../Assets/whippedcrm-2.jpg'

let dummyProducts = [
    {
        id: 1,
        title: "Naruto Kids Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "kids-cakes",
        price: 2500,
        color: ["yellow","black", "orange"],
        layerCount: 2,
        tierCount: 1,
        shape: "circle",
        keywords: "naruto",
        image: ck1,
        date: new Date("2024-03-10"),
        categories: ["Kids", "CAKES"]
    },
    {
        id: 2,
        title: "Sunny Kids Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "kids-cakes",
        price: 2800,
        color: ["blue"],
        layerCount: 4,
        tierCount: 2,
        shape: "circle",
        keywords: "sun-clouds",
        image: ck2,
        date: new Date("2024-03-09"),
        categories: ["Kids", "CAKES"]
    },
    {
        id: 3,
        title: "Box Birthday Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "birthday-cakes",
        price: 3400,
        color: ["blue","cyan"],
        layerCount: 2,
        tierCount: 1,
        shape: "square",
        keywords: "box-cake",
        image: ck3,
        date: new Date("2024-03-08"),
        categories: ["Birthday", "CAKES"]
    },
    {
        id: 4,
        title: "Cylinder Birthday Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "birthday-cakes",
        price: 3200,
        color: ["blue"],
        layerCount: 1,
        tierCount: 1,
        shape: "circle",
        keywords: "cylinder-standard",
        image: ck4,
        date: new Date("2024-03-10"),
        categories: ["Birthday", "CAKES"]
    },
    {
        id: 5,
        title: "Tradditional 2 Tier Wedding Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "wedding-cakes",
        price: 7200,
        color: ["rgb(244, 244, 244)","beige"],
        layerCount: 6,
        tierCount: 2,
        shape: "circle",
        keywords: "traditional-wedding",
        image: ck5,
        date: new Date("2024-03-05"),
        categories: ["Wedding", "CAKES"]
    },
    {
        id: 6,
        title: "Floral 2 Tier Wedding Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "wedding-cakes",
        price: 8400,
        color: ["rgb(244, 244, 244)","brown"],
        layerCount: 8,
        tierCount: 2,
        shape: "circle",
        keywords: "floral-wedding",
        image: ck6,
        date: new Date("2024-03-10"),
        categories: ["Wedding", "CAKES"]
    },
    {
        id: 7,
        title: "Valentines Heart Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "love-themed cakes",
        price: 2300,
        color: ["red"],
        layerCount: 2,
        tierCount: 1,
        shape: "heart",
        keywords: "valentines-heart",
        image: ck7,
        date: new Date("2024-03-09"),
        categories: ["Love Themed", "CAKES"]
    },
    {
        id: 8,
        title: "Valentines Floral",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "love-themed cakes",
        price: 2600,
        color: ["red","beige"],
        layerCount: 2,
        tierCount: 1,
        shape: "circle",
        keywords: "valentines-floral",
        image: ck8,
        date: new Date("2024-03-04"),
        categories: ["Love Themed", "CAKES"]
    },
    {
        id: 9,
        title: "Mehendi Fondant Cup Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "fondant cup cakes",
        price: 1600,
        color: "blue",
        keywords: "mehendi-blue",
        image: ck9,
        date: new Date("2024-03-10"),
        categories: ["Fondant", "CUP CAKES"]
    },
    {
        id: 10,
        title: "Mr Cup Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "fondant cup cakes",
        price: 1500,
        color: "beige",
        keywords: "office-mr",
        image: ck10,
        date: new Date("2024-03-10"),
        categories: ["Fondant", "CUP CAKES"]
    },
    {
        id: 11,
        title: "Sea Wave Cup Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "butter cream cup cakes",
        price: 1650,
        color: "blue",
        keywords: "sea-wave",
        image: ck11,
        date: new Date("2024-03-10"),
        categories: ["Butter Cream", "CUP CAKES"]
    },
    {
        id: 12,
        title: "Forget Me Not Cup Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "butter cream cup cakes",
        price: 1680,
        color: "purple",
        keywords: "forget-me-not",
        image: ck12,
        date: new Date("2024-03-11"),
        categories: ["Butter Cream", "CUP CAKES"]
    },
    {
        id: 13,
        title: "Snow Flake Cup Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "frosted cup cakes",
        price: 1760,
        color: "beige",
        keywords: "snow-flake",
        image: ck13,
        date: new Date("2024-03-11"),
        categories: ["Frosted", "CUP CAKES"]
    },
    {
        id: 14,
        title: "Honey Bee Cup Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "frosted cup cakes",
        price: 1700,
        color: "white",
        keywords: "honey-bee",
        image: ck14,
        date: new Date("2024-03-11"),
        categories: ["Frosted", "CUP CAKES"]
    },
    {
        id: 15,
        title: "Lemon Curd Cup Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "whipped cream cup cakes",
        price: 1850,
        color: "yellow",
        keywords: "lemon-curd",
        image: ck15,
        date: new Date("2024-03-11"),
        categories: ["Whipped Cream", "CUP CAKES"]
    },
    {
        id: 16,
        title: "Choco Leaf Cake",
        description: "Lorem ipsem gat chagr ohan wahi manh waj pron",
        category: "whipped cream cup cakes",
        price: 1800,
        color: "white",
        keywords: "choco-leaf",
        image: ck16,
        date: new Date("2024-03-12"),
        categories: ["Whipped Cream", "CUP CAKES"]
    },
];

export default dummyProducts;
