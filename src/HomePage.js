import React, { useEffect } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const cardsData = [
    {
      id: 1,
      imageUrl:
        "https://images-cdn.ubuy.ae/633b299e0b169467b86f3ebb-toys-for-5-year-old-boys-5-in-1-take.jpg",
      caption: "Toys",
      q: "toys",
    },
    {
      id: 2,
      imageUrl: "https://www.dealsunny.com/m/Store/content/r1Qu32cQ.jpg",
      caption: "Groceries",
      q: "grocery",
    },
    {
      id: 3,
      imageUrl:
        "https://media.istockphoto.com/id/1174598609/photo/set-of-contemporary-house-appliances-isolated-on-white.jpg?s=612x612&w=0&k=20&c=bBMILbCpLkhIxbL7sAAXaFOaFaSXFCt80ccHgl7iiWM=",
      caption: "Home appliances",
      q: "home",
    },
    {
      id: 4,
      imageUrl:
        "https://4.imimg.com/data4/EQ/FH/MY-2581604/electronics-500x500.jpg",
      caption: "Electonics",
      q: "elec",
    },
    {
      id: 5,
      imageUrl:
        "https://www.telegraph.co.uk/content/dam/men/2022/01/12/Main-image_trans_NvBQzQNjv4Bq2oUEflmHZZHjcYuvN_Gr-bVmXC2g6irFbtWDjolSHWg.jpg?imwidth=680",
      caption: "Men's Fashion",
      q: "man",
    },
    {
      id: 6,
      imageUrl:
        "https://glaminati.com/wp-content/uploads/2016/11/tp-holiday-outfit-ideas-womens-fashion-1.jpg",
      caption: "Women's Fashion",
      q: "woman",
    },
    {
      id: 7,
      imageUrl:
        "https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/0x0.jpg?format=jpg&width=1200",
      caption: "Books",
      q: "book",
    },
    {
      id: 8,
      imageUrl:
        "https://img.freepik.com/premium-vector/kitchenware-set-kitchen-utensils-cutlery_8071-33256.jpg?w=2000",
      caption: "Kitchen Utensils",
      q: "kitchen",
    },
    {
      id: 9,
      imageUrl:
        "https://osiamart.com/image/cache/catalog/cold-drinks/category%20banner/Fast%20Food%20-%20Instant%20-%20Ready%20Food-600x315.jpg",
      caption: "Food",
      q: "food",
    },
    {
      id: 10,
      imageUrl:
        "https://cdn.gadgets360.com/pricee/assets/category/recharge-1200x800.png",
      caption: "Mobile recharge",
      q: "recharge",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const redirectTo = (q) => {
    navigate({
      pathname: "/search",
      search: `?sort=${q}`,
    });
  };

  return (
    <div className='home-page'>
      <div className='grid-container'>
        {cardsData.map((card) => (
          <div
            className='card'
            key={card.id}
            onClick={(e) => redirectTo(card.q)}>
            <div className='card-image'>
              <img src={card.imageUrl} alt='Card' />
            </div>
            <div className='card-content'>
              <h4>{card.caption}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
