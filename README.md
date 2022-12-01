# nice_gadgets_backend-RESTful-API server

## Endpoints:
/products | GET - Get all phones.
/products/<id> | GET - Get one phone.

## Phone Item Example:
{
    "id":"71",    === str
    "category":"phones", === str
    "phoneId":"apple-iphone-xr-64gb-yellow", === str
    "itemId":"apple-iphone-xr-64gb-yellow",  === str
    "name":"Apple iPhone XR 64GB Yellow",   === str
    "fullPrice":712,  === int
    "price":670, === int
    "screen":"6.1' IPS", === str
    "capacity":"64GB", === str
    "color":"yellow", === str
    "ram":"3GB", === str
    "year":2018, === int
    "image":"img/phones/apple-iphone-xr/yellow/00.jpg"  === str
}
