import HomeCollection from '../../components/HomeComponents/HomeCollection/HomeCollection';
import HomeBestSeller from '../../components/HomeComponents/HomeBestSeller/HomeBestSeller';
import HomeProducts from '../../components/HomeComponents/HomeProducts/HomeProducts';
import './Home.scss';
import HomeSlider from '../../components/HomeComponents/HomeSlider/HomeSlider';
import HomeProductsLatest from '../../components/HomeComponents/HomeProductsLastest/HomeProductsLatest';

const Home = () => {
  return (
    <main className="home">
      {/* Section home header */}
      {/* <HomeHeader /> */}
      <HomeSlider />

      {/* Collection */}
      <HomeCollection />

      <HomeProductsLatest />

      {/* best fashion */}
      {/* <HomeAbout /> */}

      {/* best seller */}
      <HomeBestSeller />

      {/* home product */}
      <HomeProducts />
    </main>
  );
};
export default Home;
