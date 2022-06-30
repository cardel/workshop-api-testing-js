const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
});

it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');
  
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
  
    const response = await axios.get('https://httpbin.org/get', { query });
  
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

  /*
Carlos Delgado, 30 June 2022
HEAD, PATCH, PUT, DELETE
  */

it('Consume HEAD Service', async () => {
    const response = await axios.head('https://httpbin.org/headers');
  
    expect(response.status).to.equal(StatusCodes.OK);
  });


//PATCH

it('Consume PATCH Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
    const data = {
        name: 'Carlos1',
        age: '34',
        city: 'Palmira'
      }; 
    const response = await axios.patch('https://httpbin.org/patch', {data},{ query });
  
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

//PUT

it('Consume PUT Service with query parameters', async () => {
    const data = {
      name: 'Carlos',
      age: '34',
      city: 'Palmira'
    };

    const response = await axios.put('https://httpbin.org/put', { data });
  
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });


//DELETE


  it('Consume DELETE Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
  
    const response = await axios.delete('https://httpbin.org/delete', { query });
  
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });