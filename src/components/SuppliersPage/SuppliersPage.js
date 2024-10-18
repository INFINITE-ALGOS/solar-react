// src/components/MainPage/SuppliersPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './SuppliersPage.css';
import ProductCard from '../ProductCard/ProductCard';
import Slider from 'react-slick';
/*import cloudinary from 'cloudinary';*/


function SuppliersPage() {
//git push origin main --allow-unrelated-histories
  const [uploadedProducts, setUploadedProducts] = React.useState([]);
  const [uploadFormVisible, setUploadFormVisible] = React.useState(false);

  const handleUploadFormToggle = () => {
    setUploadFormVisible(!uploadFormVisible);
  };





/*  cloudinary.config({
    cloud_name: '',//'your_cloud_name',
    api_key: '',//'your_api_key',
    api_secret: '',//'your_api_secret'
  });*/
  
  const handleFileUpload = async (event) => {
    event.preventDefault();
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    
    if (!file) {
      console.log('No file selected');
      return;
    }
  
    try {
      const fileName = file.name.split('.')[0]; // Extract filename without extension
      const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert to MB
  
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch('/api/upload-product', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const uploadedProduct = await response.json();
        
        // Upload image to Cloudinary
        /*const uploadResult = await cloudinary.uploader.upload(file, {
          folder: 'products',
          public_id: `${fileName}`,
          resource_type: 'image'
        });*/
  
    /*    setUploadedProducts(prevProducts => [...prevProducts, {
          ...uploadedProduct,
          name: fileName,
          specification: fileSize + ' MB',
          imageUrl: uploadResult.secure_url
        }]);*/
        handleUploadFormToggle();
      } else {
        console.error('Failed to upload product');
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };




  const products = [
    {
      id: 1,
      title: 'Silicon Wafers',
      description: 'These wafers are essential components in our solar panels, providing excellent efficiency and durability.',
      image: 'https://static.longi.com/silicon2_7e64de8ba3.png',
      learnMoreLink: '/products/silicon-wafers',
    },
    {
      id: 2,
      title: 'PV Modules',
      description: 'Our PV modules feature top conversion efficiencies and are used across all market segments.',
      image: 'https://static.longi.com/module_2_500889fb15.png',
      learnMoreLink: '/products/pv-modules',
    },
    {
      id: 3,
      title: 'PV Solutions',
      description: 'Offering holistic solutions for the solar and renewables industry with a focus on reliability.',
      image: 'https://static.longi.com/1_50a098b7ae.png',
      learnMoreLink: '/products/pv-solutions',
    },
  ];

  const services = [
    {
      id: 1,
      title: 'Utility-Scale Solar',
      description: 'Providing large-scale solar solutions for utilities.',
      image: 'https://static.longi.com/P_Vsolution_095dc7e7cc.jpg',
      link: '/services/utility-scale-solar'
    },
    {
      id: 2,
      title: 'Commercial & Industrial',
      description: 'Tailored solar solutions for businesses.',
      image: 'https://static.longi.com/homepage_solution_67a035c486.jpg',
      link: '/services/commercial-industrial'
    },
    {
      id: 3,
      title: 'Residential',
      description: 'Solar solutions for your home.',
      image: 'https://static.longi.com/residential_d1e20b5cb2.jpg',
      link: '/services/residential'
    }
  ];

  const reviews = [
    {
        id: 1,
        name: 'Alamin Hawladar',
        quote: 'Hi, this page is very helpful! I like this page and the page owner is very good. I am happy!',
        photo: 'https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
        rating: 5,
      },
      {
        id: 2,
        name: 'John Doe',
        quote: 'Amazing service and quality! Highly recommended.',
        photo: 'data:image/jpeg;base64,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',
        rating: 4,
      },
      {
        id: 3,
        name: 'Jane Smith',
        quote: 'The products exceeded my expectations. Great job!',
        photo: 'https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg',
        rating: 5,
      },// ... (unchanged)
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
// ... (unchanged)
  };

  return (
    <div className="main-page">
      <header className="header">
        <div className="logo">Solar Solutions</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <div className="banner">
        <h1>Focused on Innovation and Reliability</h1>
      </div> {/* ... (header, banner unchanged) */}

      <section className="product-section">
        <h2>Our Products</h2>
        <div className="product-container">
          {uploadedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="upload-product-section">
        <button onClick={handleUploadFormToggle}>Upload Product</button>
        {uploadFormVisible && (
          <form onSubmit={handleFileUpload}>
            <input type="file" onChange={handleFileUpload} />
            <button type="submit">Upload</button>
          </form>
        )}
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <p>
          Solar Solutions is a world leader in the clean energy transition. We provide a comprehensive suite of solar PV solutions that can optimize a wide range of project applications.
        </p>
        <div className="services-container">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <Link to={service.link}>
                <div
                  className="service-image"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="service-title">{service.title}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>


      <section className="reviews-section">
        <h2>What People Are Saying</h2>
        <Slider {...sliderSettings}>
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="reviewer-info">
                <div className="reviewer-photo">
                  <img src={review.photo} alt={review.name} />
                </div>
                <div className="reviewer-name">{review.name}</div>
              </div>
              <div className="quote">"{review.quote}"</div>
              <div className="review-rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <footer>
        <p>&copy; 2024 Infinite Synergy. All rights reserved.</p>
      </footer>
    </div>
  );



  
}


export default SuppliersPage;
