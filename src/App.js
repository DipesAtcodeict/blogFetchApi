import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [data, setData] = useState({ data: null });

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get("http://localhost:3000/data");
      setData(result.data[0]);
    };
    fetchData();
  }, []);

  const renderBlog = () => {
    const { title, paragraphs, images } = data;

    if (data.data !== null) {
      const blogTitle = React.createElement("h2", { key: "title" }, title);

      let article = [blogTitle];
      for (let i = 0; i < paragraphs.length; i++) {
        article[i + 1] = React.createElement(
          "p",
          { key: `para${i}` },
          paragraphs[i]
        );
      }

      const fullArticle = renderImages(images, article);

      return fullArticle;
    }
  };

  const renderImages = (images, article) => {
    let arr = [...article];
    for (let i = 0; i < images.length; i++) {
      console.log(images[i].url);
      let imgPrio = images[i].prio;
      let imgEl = React.createElement("img", {
        key: `img${i}`,
        src: images[i].url
      });
      arr.splice(imgPrio, 0, imgEl);
    }

    const bodyWithImages = React.createElement(
      "div",
      { key: "bodyWithImages" },
      arr
    );

    return bodyWithImages;
  };

  return <div>{renderBlog()}</div>;
}

export default App;
