from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        user_id = 1,
        name = 'ZZ Plant', 
        description = "This hardy gem is admired for its waxy, rich green leaves that arch gracefully from its base. Hidden beneath the surface, its large potato-like rhizomes act as water reservoirs, making the ZZ Plant exceptionally drought-tolerant and perfect for those who seek beauty without the high maintenance.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/ae04913a730e4895b47181ee020e5552.jpg', 
        price = 79,
        stock_quantity = 100,
        size = 'Medium'
    )
    product2 = Product(
        user_id = 1,
        name = 'Ficus Ruby', 
        description = "The Ficus Ruby stands out with its variegated leaves in shades of pink, green, and cream, making it a striking addition to any indoor space. Its resilience to varying light conditions coupled with its slow-growing nature makes it an ideal plant for both beginners and seasoned plant enthusiasts alike.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/47a1ad8591834f90830221c944cf692d.jpg', 
        price = 79,
        stock_quantity = 100,
        size = 'Medium'
    )
    product3 = Product(
        user_id = 1,
        name = 'Aglaonema Spotted Star', 
        description = "Featuring glossy leaves speckled with pink, green, and white, the Aglaonema Spotted Star is a low-light lover that brings a pop of color to dimmer corners of your home. Its forgiving nature when it comes to watering and light makes it perfect for adding a touch of the tropics to any indoor setting.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/bce52cf361be430a8b932970f2540473.jpg', 
        price = 79,
        stock_quantity = 100,
        size = 'Medium'
    )
    product4 = Product(
        user_id = 1,
        name = 'Calathea White Star', 
        description = "With its stunning white and green striped leaves, the Calathea White Star is a living piece of art. This plant thrives in humidity and indirect light, making it a superb choice for bathrooms or kitchens. Its leaves move in response to the light, providing an ever-changing display.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/76906f9e036046259600b48312b31f13.jpg', 
        price = 79,
        stock_quantity = 100,
        size = 'Medium'
    )
    product5 = Product(
        user_id = 2,
        name = "Scindapsus Pictus 'Trebie'", 
        description = "This elegant climber, with heart-shaped leaves adorned in a silver sheen, is a testament to nature's beauty. Ideal for hanging baskets or as a climbing plant with a little support, it thrives in indirect light and requires minimal watering, making it a splendid choice for adding texture to your indoor garden.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/0dce708448904610a5b7136453682ceb.jpg', 
        price = 79,
        stock_quantity = 100,
        size = 'Medium'
    )
    product6 = Product(
        user_id = 1,
        name = "Snake Plant", 
        description = "Known for its striking, upright leaves that resemble swords, the Snake Plant is not only a bold decorative element but also an excellent air purifier. It's incredibly forgiving, thriving on neglect, and tolerates low light and infrequent watering, making it suitable for any corner of your home.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/02e8f9161f914bf38bbf42f593c5d3b3.jpg', 
        price = 128,
        stock_quantity = 100,
        size = 'Large'
    )
    product7 = Product(
        user_id = 1,
        name = "Strelitzia Nicolai", 
        description = "The Strelitzia Nicolai, or Giant White Bird of Paradise, brings a piece of the tropics into your home with its large, glossy leaves. It thrives in bright, indirect light and adds an exotic flair to any space, growing tall and making a bold statement.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/dad517661eea42ea8ea594c5473f2f03.jpg', 
        price = 128,
        stock_quantity = 100,
        size = 'Large'
    )
    product8 = Product(
        user_id = 1,
        name = "Alocasia Portodora", 
        description = "This stunning plant features large, heart-shaped leaves that stand on tall, sturdy stems. The Alocasia Portodora enjoys humid environments and indirect light, making it a dramatic and tropical addition to your indoor garden collection.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/f50f12d0d42943ea85c0a0079f027b52.jpg', 
        price = 128,
        stock_quantity = 100,
        size = 'Large'
    )
    product9 = Product(
        user_id = 2,
        name = "Dracaena Rikki", 
        description = "The Dracaena Rikki is celebrated for its long, striped leaves and its ability to adapt to various indoor conditions. It's a low-maintenance plant that purifies the air, thriving in indirect light and requiring only occasional watering, perfect for adding greenery to your workspace or living area.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/1b22b396480644daafb652acce3dde79.jpg', 
        price = 128,
        stock_quantity = 100,
        size = 'Large'
    )
    product10 = Product(
        user_id = 1,
        name = "Pilea Peperomioides", 
        description = "The Pilea Peperomioides, with its unique coin-shaped leaves, makes for a delightful and quirky addition to any plant collection. It prefers bright, indirect light and minimal water, making it an excellent choice for those looking to add a touch of whimsy to their home.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/ac4c13b4d87b4caba64290cc691a46ad.jpg', 
        price = 49,
        stock_quantity = 100,
        size = 'Small'
    )
    product11 = Product(
        user_id = 1,
        name = "Anthurium Scherzerianum", 
        description = "Known for its glossy heart-shaped leaves and bright red spathes, the Anthurium Scherzerianum adds a splash of color to any indoor space. It thrives in bright, indirect light and enjoys high humidity, making it a stunning and vibrant choice for brightening up your home.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/13350e0aaa13404e851a5906db8ea770.jpg', 
        price = 49,
        stock_quantity = 100,
        size = 'Small'
    )
    product12 = Product(
        user_id = 1,
        name = "Peperomia Plant", 
        description = "With its wide variety of textures and colors, the Peperomia is a versatile and easy-to-care-for plant. It prefers indirect light and occasional watering, making it perfect for small spaces or as a desk plant, adding a touch of greenery without demanding too much attention.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/9b0a671415744b55b66781c1f98df1fe.jpg', 
        price = 49,
        stock_quantity = 100,
        size = 'Small'
    )
    product13 = Product(
        user_id = 1,
        name = "Money Tree", 
        description = "The Money Tree is beloved for its braided trunk and lush, green leaves. It's said to bring good luck and prosperity to its owner. Preferring bright, indirect light and occasional watering, this plant is a symbolic and stylish addition to your home or office.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/c5a2eea2fea849f9803dffaa56e5fe56.jpg', 
        price = 49,
        stock_quantity = 100,
        size = 'Small'
    )
    product14 = Product(
        user_id = 1,
        name = "Dracaena Fragrans", 
        description = "With its glossy green leaves and striking form, the Dracaena Fragrans, also known as the Corn Plant, is a low-maintenance addition that fits well in any space. It excels in filtered light and requires minimal watering, making it an excellent choice for adding a touch of sophistication to your indoor garden.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/8ee3ba78f0cc4fe68fd3d7287bccb3f5.jpg', 
        price = 49,
        stock_quantity = 100,
        size = 'Small'
    )
    product15 = Product(
        user_id = 2,
        name = "Monstera Minima", 
        description = "The Monstera Minima is a compact, fast-growing plant with distinctive split leaves. It thrives in bright, indirect light and regular watering, making it an ideal plant for those who love the Monst.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/f07fc1fae7c94afa822c20a3616aa027.jpg', 
        price = 49,
        stock_quantity = 100,
        size = 'Small'
    )
    product16 = Product(
        user_id = 1,
        name = "Baby Caladium", 
        description = "Petite in stature but grand in visual impact, these little wonders are perfect for brightening up shady corners of your home. They revel in dappled light and enjoy consistent moisture, bringing a touch of tropical flair to your living space.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/bcd7502d07864d9ba38a4c91a658260e.jpg', 
        price = 49,
        stock_quantity = 100,
        size = 'bloom'
    )
    product17 = Product(
        user_id = 1,
        name = "Peace Lily", 
        description = "This low-maintenance companion flourishes in filtered light and needs only a drink when its leaves give a gentle droop, making it an ideal match for both seasoned and novice plant enthusiasts.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/44ce75990706410db3921d8adfe890fc.jpg', 
        price = 79,
        stock_quantity = 100,
        size = 'bloom'
    )
    product18 = Product(
        user_id = 1,
        name = "Brassica Napus", 
        description = "Its seeds promising a yield of rich, wholesome oil. Hardy and robust, this crop graces the outdoors with its presence and asks for little more than sun-kissed days and well-drained soil.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/87def81b3e1f4641a0274d85aa9759d6.jpg', 
        price = 128,
        stock_quantity = 100,
        size = 'bloom'
    )
    product19 = Product(
        user_id = 1,
        name = "Hydrangea-White", 
        description = "A living bouquet that flourishes under the canopy of trees or on the north side of homes, this plant prefers morning light and afternoon shade. Indulge in the enchantment of the 'Mystic Cloud' and let your garden tell a story of magical hues.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/efca0c1844da4825b7b457695b52de44.jpg', 
        price = 128,
        stock_quantity = 100,
        size = 'bloom'
    )
    product20 = Product(
        user_id = 1,
        name = "Hydrangea-Blue", 
        description = "Discover the lush allure of the Hydrangea. Its voluminous clusters of soft, cloud-like flowers range from dreamy blues to vibrant pinks, changing with the whispers of the soil's secrets.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/0dbb3510a700416caa6b142844566d14.jpg', 
        price = 128,
        stock_quantity = 100,
        size = 'bloom'
    )
    product21 = Product(
        user_id = 1,
        name = "Tulips", 
        description = "Celebrate the splendor of spring with our Tulips collection. Like a painter's palette, these tulips bloom in a spectrum of colors, each petal a masterpiece of genetic wonder, announcing the rebirth of your garden.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/f9952d803ff64b28b1955378de7ad0c8.jpg', 
        price = 128,
        stock_quantity = 100,
        size = 'bloom'
    )
    product22 = Product(
        user_id = 1,
        name = "Vibrant Vessel Planters", 
        description = "A rainbow array of ceramic planters that will infuse your home with a burst of color. These ribbed-textured pots are perfect for showcasing everything from succulents to herbs. Elevate your plant game with these cheerful homes for your greenery!", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/5372a91f08cd48dfa26f089402cca36a.jpg', 
        price = 24,
        stock_quantity = 100,
        size = 'gift'
    )
    product23 = Product(
        user_id = 1,
        name = "Golden Bee Brooch", 
        description = "Adorn your outfit with our Golden Bee Brooch, a symbol of diligence and community. Crafted with intricate detailing, this accessory adds a touch of elegance and charm to any ensemble.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/f222f46286c74f3aba53f23ec7736d3d.jpg', 
        price = 15,
        stock_quantity = 100,
        size = 'gift'
    )
    product24 = Product(
        user_id = 1,
        name = "Trio Tone Plant Pots", 
        description = "Embrace minimalism with our set of three earth-toned plant pots. Perfect for a unified yet diverse look, these pots are ideal for creating a serene plant display in any space.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/bb0c3c18a1834dd2baca6dd4e0504ba2.jpg', 
        price = 35,
        stock_quantity = 100,
        size = 'gift'
    )
    product25 = Product(
        user_id = 1,
        name = "Eco-Friendly Plant Towels", 
        description = "Our plant-themed kitchen towels are not just super absorbent but also eco-friendly! Made from sustainable materials, they bring a touch of green to your kitchen while helping you reduce your carbon footprint.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/0362c7cfb09a4957b093e8de11630db2.jpg', 
        price = 12,
        stock_quantity = 100,
        size = 'gift'
    )
    product26 = Product(
        user_id = 1,
        name = "Wall Calendar", 
        description = "Stay organized and inspired with our Wall Calendar. Each month reveals a stunning new plant design, perfect for nature lovers looking to add a botanical flair to their walls.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/fb3c66d15baa46038090110f3d15e3ae.jpg', 
        price = 30,
        stock_quantity = 100,
        size = 'gift'
    )
    product27 = Product(
        user_id = 1,
        name = "Botanical Cork Coasters", 
        description = "Protect your surfaces in style with our Botanical Cork Coasters. Featuring elegant plant silhouettes, these coasters not only prevent stains but also add a natural aesthetic to your table setting.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/4c5faf846d954b909516cec011e45b3f.jpg', 
        price = 20,
        stock_quantity = 100,
        size = 'gift'
    )
    product28 = Product(
        user_id = 1,
        name = "Festive Miniature Pine Tree", 
        description = "Celebrate the holiday season with our Festive Miniature Pine Tree. This charming, potted decoration is perfect for small spaces or as a thoughtful gift, bringing a dash of yuletide cheer wherever it's placed.", 
        image = 'https://rhythm-realm-img-bucket.s3.us-east-2.amazonaws.com/118750775a3f419eb1d2c03171356e52.jpg', 
        price = 55,
        stock_quantity = 100,
        size = 'gift'
    )
    
    
    
    
    
    
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)
    db.session.add(product21)
    db.session.add(product22)
    db.session.add(product23)
    db.session.add(product24)
    db.session.add(product25)
    db.session.add(product26)
    db.session.add(product27)
    db.session.add(product28)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()
    