import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { expect } from 'chai';
import ListHeader from '../src/components/ListHeader';
import ListItem from '../src/components/ListItem';
// import App from '../src/App';
import app from '../../server/server';
import '../../server/db'
import chai from 'chai';
import chaiHttp from 'chai-http'

chai.use(chaiHttp);

// screen.logTestingPlaygroundURL();
const server = 'http://localhost:8000'

describe('Auth verification', () => {

    it('should pass verification', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                email: '123@test.com',
                password: '132456'
            })
            .end((err, res) => {
                if (err) {
                    console.log('error:', err)
                } else {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                }
                done();
            })
    })

    it('should fail verification on email', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                email: 'bad-email@test.com', // incorrect email
                password: '132456' 
            })
            .end((err, res) => {
                if (err) {
                    console.log('error:', err)
                } else {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').that.is.equal('User does not exist!');
                }
                done()
            })
    })

    it('should fail verification on password', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                email: '123@test.com',
                password: 'abcdef' // incorrect password
            })
            .end((err, res) => {
                if (err) {
                    console.log('error:', err)
                } else {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').that.is.equal('Login failed!');
                }
                done()
            })
    })
})

describe('Auth validation', () => {
    it('should fail verification for using invalid characters in email', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                email: '123+@test.com', // uses invalid character +
                password: 'abcdef'
            })
            .end((err, res) => {
                if (err) {
                    console.log('error:', err)
                } else {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').that.is.equal('Special characters allowed in email are: - _ . @');
                }
                done()
            })
    })

    it('should fail verification for using invalid characters in password', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                email: '123@test.com', 
                password: 'abcdef+' // uses invalid character +
            })
            .end((err, res) => {
                if (err) {
                    console.log('error:', err)
                } else {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').that.is.equal('Invalid password - special characters accepted: - _ . @ # £ $ % ! ?');
                }
                done()
            })
    })

    it('should fail verification with a password of invalid length', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                email: '123@test.com', 
                password: 'a' // short password < 6
            })
            .end((err, res) => {
                if (err) {
                    console.log('error:', err)
                } else {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').that.is.equal('Invalid password, must be 6 - 20 characters long');
                }
                done()
            })
    })
})

describe('ListHeader', () => {
    it('should display create Modal when Add new button is clicked', () => {
        render(<ListHeader />);
        // Act
        const addButton = screen.getByRole('button', {
            name: /add new/i
          })
        fireEvent.click(addButton);
        
        // Assert
        const createModal = screen.getByText('Lets create your task')
        expect(createModal).to.exist;
    })
})

describe('ListItem', () => {
    // mocked props
    const task = {title: 'Sample'}
    const getData = () => {
        console.log('mocked getData')
        return title
    }

    beforeEach(() => {
        render(
            <ListItem task={task} getData={getData}/>
            )})
        it('should display edit Modal when edit button is clicked', () => {
        // Act
        const editButton = screen.getByTestId("edit");
        fireEvent.click(editButton);
        
        // Assert
        const editModal = screen.getByText('Lets edit your task')
        expect(editModal).to.exist;
    })
})

// describe('App', async () => {
//     it('should render the App component', async () => {
//         render(<App/>)
//         // screen.debug()
//     })
// })

//  chai http



/*
describe('Auth', async () => {
    const handleSubmit = () => {

    }
    it('should return an error when auth receives invalid input', async () => {  
        render( <Auth /> )
        // const {debug} = screen.debug()
        screen.logTestingPlaygroundURL();

        // Act
        // email input
        const emailInput = screen.getByPlaceholderText(/email/i)
        fireEvent.change(emailInput, {target: {value: 'abc@test.com'}})
        // password input
        const passwordInput = screen.getByPlaceholderText(/password/i)
        fireEvent.change(passwordInput, {target: {value: '123456++++'}})

        // submit
        const view = screen.getByTitle(/login/i);

        const button = screen.getByTestId("submit");

        fireEvent.click(button)

        // const emailInput = screen.getByPlaceholderText('email');
        // const passwordInput = screen.getByPlaceholderText('password');
        // const submitButton = screen.getByTestId('submit');

        // fireEvent.change(emailInput, { target: { value: 'abc@test.com' } });
        // fireEvent.change(passwordInput, { target: { value: '123456+++++' } });
        // fireEvent.click(submitButton);
        // logRoles(submitButton)
        // const error = screen.getByTestId("error")
        // logRoles(error)
        // Assert no error message is displayed
        expect(screen.getByTestId('error')).to.be.null;
        
        Assert
        setTimeout(() => {
        const homeScreen = screen.queryByText("Holiday tick list")
        expect(homeScreen).to.be.null;
        }, 4000)
            const error = screen.getByTestId("error")
            screen.debug(error)
            expect(error).toBeTruthy();
        const errorResponse = await screen.findByText('Error: Special characters allowed in email are: - _ . @');
        const findError = screen.getByTestId('error');
        expect(errorResponse)
        expect(errorResponse).to.have.text('Error: Special characters allowed in email are: - _ . @');
    })
})
*/

/*
describe('Modal', async () => {
    it('should render the input as a ListItem', async () => {
        render( <Modal /> )
        // screen.logTestingPlaygroundURL()
        const input = screen.getByRole('textbox') // select input
        fireEvent.change(input, {target: {value: 'test todo!'}})
        const submit = screen.getByRole('button', {
            name: /submit/i
        })  // select submit
        fireEvent.click(submit)

        const renderedTodo = await screen.getByText('test todo!')
        expect(renderedTodo).to.exist

    })

})
*/

/*
describe('Auth', async () => {
    it('should return an error when auth receives invalid input', async () => {  
        render( <Auth /> )
        // const {debug} = screen.debug()

        // screen.logTestingPlaygroundURL();
        // Act
        // email input
        // const emailInput = screen.getByPlaceholderText(/email/i)
        // fireEvent.change(emailInput, {target: {value: 'abc@test.com'}})
        // // password input
        // const passwordInput = screen.getByPlaceholderText(/password/i)
        // fireEvent.change(passwordInput, {target: {value: '123456++++'}})

        // submit
        // const view = screen.getByTitle(/login/i);

        // const button = screen.getByTestId("submit");

        // fireEvent.click(button)

        const emailInput = screen.getByPlaceholderText('email');
        const passwordInput = screen.getByPlaceholderText('password');
        const submitButton = screen.getByTestId('submit');

        fireEvent.change(emailInput, { target: { value: 'abc@test.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456+++++' } });
        fireEvent.click(submitButton);
        logRoles(submitButton)
        const error = screen.getByTestId("error")
        logRoles(error)
        // Assert no error message is displayed
        expect(screen.getByTestId('error')).to.be.null;
        
        // Assert
        // setTimeout(() => {
        // const homeScreen = screen.queryByText("Holiday tick list")
        // expect(homeScreen).to.be.null;
        // }, 4000)
            // const error = screen.getByTestId("error")
            // screen.debug(error)
            // expect(error).toBeTruthy();
        // const errorResponse = await screen.findByText('Error: Special characters allowed in email are: - _ . @');
        // const findError = screen.getByTestId('error');
        // expect(errorResponse)
        // expect(errorResponse).to.have.text('Error: Special characters allowed in email are: - _ . @');
    })
})

// const handleSubmit = async () => {
        //     const response = await fetch('https://localhost:8000/login', {
        //         method: 'POST',
        //         headers: {'Content-type': 'application/json'},
        //         body: JSON.stringify({
        //             email: emailInput.value,
        //             password: passwordInput.value
        //         })
        //     })
        //     const responseData = await response.json()
        //     console.log(responseData)
        //     const errorMessage = responseData.message
        //     if (errorMessage) {
        //         setError(data.message)
        //     }
        // }

        */