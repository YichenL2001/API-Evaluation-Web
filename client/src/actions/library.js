// Functions to help with lib actions.
import ENV from "./../config.js";
const API_HOST = ENV.api_host;

const JavaInfo = [
  {
    pic: "library_photos/javaphoto/apache.jpg",
    name: "Apache Commons",
    description:
      " If you ever feel like writing a utility class in your project, the chances are relatively high that there already exists a mature and powerful Apache Commons library.",
  },
  {
    pic: "library_photos/javaphoto/guava.jpeg",
    name: "Guava",
    description:
      "It covers essential utilities, collections, string manipulation, concurrency utilities, graph libraries, I/O utils, hashing, and many more.",
  },
  {
    pic: "library_photos/javaphoto/jackson.png",
    name: "Jackson",
    description:
      " Jackson is a suite of data processing libraries for Java. Jackson JSON is the de facto streaming JSON parser/generator library.",
  },
  {
    pic: "library_photos/javaphoto/jaxb.png",
    name: "JAXB",
    description:
      " JAXB offers everything you need to work with XML in Java. It provides a standard and efficient way of mapping between the XML and Java code.",
  },
  {
    pic: "https://static.javatpoint.com/tutorial/mockito/images/mockito.png",
    name: "Mockito",
    description:
      " Whether you are testing a small project or a huge, complex Enterprise Java project, you can use Mockito everywhere. It offers a very simple, clean API and keeps your Unit/Integration tests clean.",
  },
  {
    pic: "https://keyholesoftware.com/wp-content/uploads/AssertJ.png",
    name: "AssertJ",
    description:
      " One of the main features of testing is to verify whether the test result matches the expected result. JUnit has a built-in assertion mechanism in class org.junit.Assert. It offers a couple of static methods for test verification.",
  },
  {
    pic: "https://www.javatpoint.com/images/hibernate/hibernate2.png",
    name: "Hibernate",
    description:
      " Hibernate is one of the earliest ORM libraries among all programming languages and has inspired many similar technologies in the industry.",
  },
];

const JsInfo = [
  {
    pic: "library_photos/jsphoto/jquery.jpeg",
    name: "jQuery",
    description:
      "It makes things simpler for HTML document manipulation and traversal, animation, event handling, and Ajax.",
  },
  {
    pic: "logo192.png",
    name: "React",
    description:
      "Just design a simple view for individual states in your app. Next, it will render and update the right component efficiently upon data changes.sidered as one of the best libraries for working with complex data.",
  },
  {
    pic: "library_photos/jsphoto/D3.jpeg",
    name: "D3",
    description:
      " It emphasizes web standards and provides you with modern browser capabilities without being limited to a single framework. D3.js enables powerful data visualizations.",
  },
  {
    pic: "library_photos/jsphoto/underscore.png",
    name: "Underscore",
    description:
      " Underscore is a JavaScript utility library that provides various functions for typical programming tasks.",
  },
  {
    pic: "https://miro.medium.com/max/800/1*3NrSA_osjPYn2rKVvjIGCw.png",
    name: "Lodash",
    description:
      " Lodash is also a JS utility library that makes it easier to work with numbers, arrays, strings, objects, etc.",
  },
  {
    pic: "https://www.evernote.design/assets/images/animejs.jpg",
    name: "Anime",
    description:
      " If you want to add animations to your site or application, Anime.js is one of the best JavaScript libraries you can find.",
  },
  {
    pic: "https://lh3.googleusercontent.com/proxy/6DfnspHA08H_F03JBXTWU9KYjuf0CDHH3Z_wMvQT8jtgSUMOYzQEZjUkgKND4_sU1LOYcSpgbZU1lg0lbag_qIG3fP7nXIX-ZvqMdIf-z6om6I1-ykwQLIpaRrW1",
    name: "Cleave",
    description:
      " Cleave.js offers an interesting solution if you want to format your text content. Its creation aims to provide an easier way to increase the input field’s readability by formatting the typed data.",
  },
  {
    pic: "https://cms-assets.tutsplus.com/uploads/users/34/syllabuses/1160/preview_image/chartjs-tutsplus.jpg",
    name: "Chart",
    description:
      " Chart.js is a flexible and simple library for designers and developers who can add beautiful charts and graphs to their projects in no time. It is open-source and has an MIT license.",
  },
];

const PythonInfo = [
  {
    pic: "library_photos/pythonphoto/tensor.png",
    name: "TensorFlow",
    description:
      "TensorFlow is optimized for speed, it makes use of techniques like XLA for quick linear algebra operations.",
  },
  {
    pic: "library_photos/pythonphoto/scikit.png",
    name: "Scikit",
    description:
      "It is considered as one of the best libraries for working with complex data.",
  },
  {
    pic: "library_photos/pythonphoto/numpy.png",
    name: "Numpy",
    description:
      " Numpy is considered as one of the most popular machine learning library in Python.",
  },
  {
    pic: "library_photos/pythonphoto/keras.png",
    name: "Keras",
    description:
      " Keras is considered as one of the coolest machine learning libraries in Python. It provides an easier mechanism to express neural networks.",
  },
  {
    pic: "library_photos/pythonphoto/pytorch.png",
    name: "Pytorch",
    description:
      " PyTorch is the largest machine learning library that allow developers to perform tensor computations wan ith acceleration of GPU, creates dynamic computational graphs, and calculate gradients automatically.",
  },
  {
    pic: "library_photos/pythonphoto/scipy.png",
    name: "Scipy",
    description:
      " SciPy is a machine learning library for application developers and engineers. However, you still need to know the difference between SciPy library and SciPy stack. SciPy library contains modules for optimization, linear algebra, integration, and statistics.",
  },
  {
    pic: "library_photos/pythonphoto/theano.png",
    name: "Theano",
    description:
      " Theano is a computational framework machine learning library in Python for computing multidimensional arrays. Theano works similar to TensorFlow, but it not as efficient as TensorFlow. Because of its inability to fit into production environments.",
  },
  {
    pic: "library_photos/pythonphoto/pandas.png",
    name: "Pandas",
    description:
      " Pandas is a machine learning library in Python that provides data structures of high-level and a wide variety of tools for analysis. One of the great feature of this library is the ability to translate complex operations with data using one or two commands.",
  },
];

export const pushLibs = (language) => {
  const url = `${API_HOST}/api/libraries`;
  if (language === "java") {
    JavaInfo.forEach((lib) => {
      const lib_upload = {
        name: lib.name,
        description: lib.description,
        language: "java",
        picture: lib.pic,
      };

      const request = new Request(url, {
        method: "post",
        body: JSON.stringify(lib_upload),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      fetch(request);
    });
  } else if (language === "js") {
    JsInfo.forEach((lib) => {
      const lib_upload = {
        name: lib.name,
        description: lib.description,
        language: "javascript",
        picture: lib.pic,
      };

      const request = new Request(url, {
        method: "post",
        body: JSON.stringify(lib_upload),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      fetch(request);
    });
  } else if (language === "python") {
    PythonInfo.forEach((lib) => {
      const lib_upload = {
        name: lib.name,
        description: lib.description,
        language: "python",
        picture: lib.pic,
      };

      const request = new Request(url, {
        method: "post",
        body: JSON.stringify(lib_upload),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      fetch(request);
    });
  }
};
// langName need to be java/javascript/python
export const getLibs = (langName, LangPage) => {
  const url = `${API_HOST}/api/libraries/language/${langName}`;
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      const lst = [];
      json.lib.forEach((lib) => {
        const obj = { pic: "", name: "", description: "", url: "", rate: "" };
        obj.pic = lib.picture;
        obj.name = lib.name;
        obj.description = lib.description;
        obj.rate = lib.rate;
        obj.url = `/LibraryPage/${lib._id}`;
        lst.push(obj);
      });
      LangPage.setState({ Info: lst });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getLibName = (searchBoxPage) => {
  const url = `${API_HOST}/api/libraries/library/${searchBoxPage.state.searchbox}`;

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      searchBoxPage.setState({
        libName: json.name,
        libID: json._id,
        libPic: json.picture,
        libFound: true,
      });
    })
    .catch((error) => {
      searchBoxPage.setState({
        libFound: false,
      });
    });
};

// .then((res) => {

//   console.log(result);
//   if (res.status === 200) {
//     searchBoxPage.setState({
//       libName: result.name,
//       libID: result._id,
//       libPic: result.picture,
//     });
//   } else {
//     searchBoxPage.setState({
//       libFound: false,
//     });
//   }
// })
// .catch((error) => {
//   console.log(error);
// });

export const add_to_userfav_liv = (app, libraryPage) => {
  const new_lib = {
    lib_id: "",
    name: "",
    pic: "",
    language: "",
  };
  new_lib.lib_id = libraryPage.state.apiResponse._id;
  new_lib.name = libraryPage.state.apiResponse.name;
  new_lib.pic = libraryPage.state.apiResponse.picture;
  new_lib.language = libraryPage.state.apiResponse.language;
  const request = new Request(`${API_HOST}/api/users/libs/${app.state.id}`, {
    method: "post",
    body: JSON.stringify(new_lib),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request);
};
