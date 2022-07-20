const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: 31,
      city: 'New York'
    };
    const response = await axios.get('https://httpbin.org/get', { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });
  /*
  Carlos Delgado, 19 July 2022
  POST, HEAD, PATCH, PUT, DELETE
  */
  it('Consume POST Service', async () => {
    const query = {
      name: 'John',
      age: 31,
      city: 'New York'
    };

    const response = await axios.post('https://httpbin.org/post', query);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.eql(query);
  });

  it('Consume HEAD Service', async () => {
    const response = await axios.head('https://httpbin.org/headers');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers).to.have.property('content-type', 'application/json');
    expect(response.data).to.eql('');
  });

  // PATCH

  it('Consume PATCH Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
    const response = await axios.patch('https://httpbin.org/patch', query);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.eql(query);
  });

  // PUT

  it('Consume PUT Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: 31,
      city: 'New York'
    };

    const response = await axios.put('https://httpbin.org/put', query);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.eql(query);
  });

  // DELETE

  it('Consume DELETE Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await axios.delete('https://httpbin.org/delete', { params: query });
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.eql(null);
  });
});
