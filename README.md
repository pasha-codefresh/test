# Task for codefresh

Microservice for parsing and visualize data about sessions of users, available on http://codefresh.gemicle.com/

### Prerequisites

You must have nodejs version 8 or higher installed and npm, how to install nodejs https://nodejs.org/uk/download/package-manager/

Also for running tests you must have mocha installed globally 

```
npm i mocha -g
```

### Installing

Clone this project, then in console enter in project root directory and execute following npm run build

command build install required modules and start server on port 5002. Now you can open in your browser localhost:5002
 page and see visualization of users sessions

```
npm run build
```

## Running the tests

For run tests execute npm run tests
```
npm run tests
```

### Break down into end to end tests

Test check if file for parsing exists and have valid structure and check 
work of helpers functions

## Built With

* [Express](http://expressjs.com/) - The framework for node js
* [Mocha](https://mochajs.org/) - Framework for testing

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Denys Voznyuk** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
