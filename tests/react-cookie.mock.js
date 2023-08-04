import React from 'react';
import { useCookies } from 'react-cookie';


export const authCookies = () => {
        const authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0B0ZXN0LmNvbSIsImlhdCI6MTY4ODg1MDY5MiwiZXhwIjoxNjg4ODU0MjkyfQ.2L05zW53b7hm5FSS4KVJgAb-gHUhoKgKMJMVvoGpKEY';
        const [cookies, setCookies] = useCookies(['authToken', 'email']);
        setCookies('authToken', authKey)
        setCookies('email', 'abc@test.com')
        
        return {
        authToken: authKey,
        email: 'abc@test.com',
        }
    }
  
        // describe('ListItem', () => {
    //     beforeEach(() => {
    //         authCookies();
    //         render(
    //         <CookiesProvider>
    //             <ListItem />
    //         </CookiesProvider>
    //         )
    //     })
    // })

    // it('should delete the todo with the title of test and prove its deleted', () => {
    //     // Act
    //     // finding todo titled test
    //     const ListItem = screen.getByText('test')
    //     // finding delete button
    //     const deleteItem = within(ListItem).getByTestId("delete")
    //     // clicking delete
    //     fireEvent.click(deleteItem)
    //     // Assert
    //     expect(screen.queryByText('test')).to.be.null;
    // })