import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    CardBody,
    CardText,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormFeedback
} from "reactstrap";
import { Link } from "react-router-dom";

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            rating: 1,
            name: "",
            comment: "",
        }
        this.onToggle = this.onToggle.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }

    onToggle = () => {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        })
    }

    unControllFromInput = (state, value) => {
        let inputstate = { ...this.state }
        inputstate[state] = value
        this.setState(inputstate)
    }

    validateForm = () => {
        if (this.state.name.length < 3) return "Must be greater than two characters"
        if (this.state.name.length > 15) return "Must be 15 characters or less"
        return null
    }

    render() {
        return (
            <>
                <Modal isOpen={this.state.isOpen} toggle={() => this.onToggle()} >
                    <ModalHeader toggle={() => this.onToggle()} >Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Rating</Label>
                                <Input type="select" onChange={(e) => this.unControllFromInput("rating", e.target.value)} defaultValue={1} >
                                    {[1, 2, 3, 4, 5].map(item => <option key={item}>{item}</option>)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Your Name</Label>
                                <Input placeholder="Your name" invalid={this.validateForm() !== null} valid={!this.validateForm()} type="text" onChange={(e) => this.unControllFromInput("name", e.target.value)} />
                                <FormFeedback>{this.validateForm()}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Comment</Label>
                                <Input type="textarea" rows="6" onChange={(e) => this.unControllFromInput("comment", e.target.value)} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <div style={{ width: "100%" }}>
                            <Button className="btn-info mr-auto" disabled={this.validateForm() !== null} onClick={this.onToggle}  >Submit</Button>
                        </div>
                    </ModalFooter>
                </Modal>
                <Button outline className="mt-3" onClick={this.onToggle} > <span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            </>
        )
    }
}

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
                                        className="list-untiled ps-1 m-3"
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

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
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
                    <div className="col-12 col-md-5 m-1">{this.renderComments()}
                        <CommentForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;