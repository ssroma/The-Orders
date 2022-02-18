import Class from './Card.module.css';


const Card = (props) => {
    return <div className={Class.card}>
        {props.children}
    </div>
};

export default Card;