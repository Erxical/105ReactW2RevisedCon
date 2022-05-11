import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardText,
} from "reactstrap";

import { Link } from "react-router-dom";

// function RenderMenuItem({ dish, onClick }) {
//   return (
//     <Card>
//       <Link to={`/menu/${dish.id}`}>
//         <CardImg width="100%" src={dish.image} alt={dish.name} />

//         <CardImgOverlay>
//           <CardTitle>{dish.name}</CardTitle>
//         </CardImgOverlay>
//       </Link>
//     </Card>
//   );
// }
class DishDetail extends Component {
  renderDish() {
    const dish = this.props.dishes[this.props.selectedDish];
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
  }

  renderComments() {
    const dish = this.props.dishes[this.props.selectedDish];
    const comments = this.props.comments.filter(
      (comment) => comment.dishId === dish.id
    );
    if (dish != null)
      return (
        <Card>
          <CardTitle>
            <h4>Comments</h4>
          </CardTitle>
          <CardBody className="ps-0 m-0">
            <ul className="list-group list-group-flush list-unstyled">
              {comments.map((comment) => {
                return (
                  <li
                    key={comment.id}
                    className="list-group-item list-untiled ps-0 m-0"
                  >
                    {comment.comment}
                    <br />
                    {"--" + comment.author + ", "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      );
  }

  render() {
    const dish = this.props.dishes[this.props.selectedDish];

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>

            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>

          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-5 m-1">{this.renderDish()}</div>

          <div className="col-12 col-md-5 m-1">{this.renderComments()}</div>
        </div>
      </div>
    );
  }
}

export default DishDetail;