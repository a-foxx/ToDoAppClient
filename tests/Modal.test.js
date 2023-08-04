import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { expect } from 'chai';
import ListHeader from '../src/components/ListHeader';
import ListItem from '../src/components/ListItem';
import Modal from '../src/components/Modal';
import Auth from '../src/components/Auth';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = { userAgent: 'node.js' };

// screen.logTestingPlaygroundURL();

describe('ListHeader', () => {
    render(<ListHeader />);
    screen.logTestingPlaygroundURL();
    it('should display create Modal when Add new button is clicked', () => {
    
        // Act
        const addButton = screen.getByRole('button', {
            name: /add new/i
          })
        fireEvent.click(addButton);
        
        // Assert
        const createModal = screen.getByText('Lets create your task')
        expect(createModal).to.exist;

        const addToDo = screen.getByRole('textbox')
        fireEvent.change(addToDo, {target: {value: 'test'}})
        const submit = screen.getByRole('button', {
            name: /submit/i
          })
        fireEvent.click(submit)

        const findToDo = screen.getByText("test")
        expect(findToDo).to.exist;

    })
})

describe('ListItem', () => {
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