import CollectionCard from '../../CollectionCard/CollectionCard';
import './HomeCollection.scss';

const HomeCollection = () => {
  return (
    <section className="collection container">
      <div className="collection__heading">
        <h1 className="collection__title">new collection</h1>
        <span className="collection__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
      <div className="collection__top3">
        <div className="dot-texture"></div>
        <div className="dot-texture"></div>
        <CollectionCard
          name="T-shirt"
          imageUrl="https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <CollectionCard
          name="long sleeve"
          imageUrl="https://images.unsplash.com/photo-1553859943-a02c5418b798?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
        />
        <CollectionCard
          name="sweater"
          imageUrl="https://images.unsplash.com/photo-1580331451062-99ff652288d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
        <CollectionCard
          name="sweater"
          imageUrl="https://images.unsplash.com/photo-1580331451062-99ff652288d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </div>
    </section>
  );
};
export default HomeCollection;