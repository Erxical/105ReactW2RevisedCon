import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
export default class DishDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const renderDish = (dish) => {
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle> <b> {dish.name} </b></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        };
        const renderComments = (comments) => {
            return (
                <CardBody>
                    <h4>Comments</h4>
                    <div className="list-group">
                        {comments.map((item) => (
                            <p key={item.id} >
                                {item.comment} <br /> --- {item.author},
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                }).format(new Date(Date.parse(item.date)))}{" "}
                            </p>
                        ))}
                    </div>
                </CardBody>
            );
        };
        const { dish, comments } = this.props;
        return (
            <div className="row col-12">
                <div className="col-12 col-md-5 m-1">{renderDish(dish)}</div>
                <div className="col-12 col-md-5 m-1">{renderComments(comments)}</div>
            </div>
        );
    }
}