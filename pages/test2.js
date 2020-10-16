// import { Link, animateScroll as scroll, Element, Button } from "react-scroll";
// import $ from "jquery";

// export default function App(props) {
//   const handleSetActive = (e, f) => console.log({ e, f });

//   function wheelDistance(e) {
//     console.log(e);
//     if (!e) {
//       e = window.event;
//     }
//     var w = e.wheelDelta,
//       d = e.detail;
//     if (d) {
//       return -d / 3; // Firefox;
//     }

//     // IE, Safari, Chrome & other browsers
//     return w / 120;
//   }

//   function handleScroll(e) {
//     var delta = wheelDistance(e);
//     console.log(delta);
//     var time = 1000;
//     var distance = 400;

//     $("html, body")
//       .stop()
//       .animate(
//         {
//           scrollTop: $(window).scrollTop() - distance * delta,
//         },
//         time
//       );
//   }

//   function wheel(event) {
//     var delta = 0;
//     if (event.wheelDelta) {
//       delta = event.wheelDelta / 120;
//     } else if (event.detail) {
//       delta = -event.detail / 3;
//     }

//     handle(delta);
//     if (event.preventDefault) {
//       event.preventDefault();
//     }
//     event.returnValue = false;
//   }

//   function handle(delta) {
//     var time = 1000;
//     var distance = 300;

//     $("html, body")
//       .stop()
//       .animate(
//         {
//           scrollTop: $(window).scrollTop() - distance * delta,
//         },
//         time
//       );
//   }

//   React.useEffect(() => {
//     // Adding event listener for some element
//     // var speed = window.addEventListener("DOMMouseScroll", wheelDistance);

//     // Adding event listeners for some element in DOM
//     // window.addEventListener("mousewheel", handleScroll);
//     // window.addEventListener("DOMMouseScroll", handleScroll);

//     if (window.addEventListener) {
//       window.addEventListener("DOMMouseScroll", wheel);
//     }
//     window.onmousewheel = document.onmousewheel = wheel;

//     let e = document.documentElement || document.body;
//     console.log({ e });

//     return () => {};
//   }, []);
//   return (
//     <React.Fragment>
//       <div id="example">
//         <div className="links">
//           <Link
//             activeClass="element-purple"
//             to="test1"
//             spy={true}
//             smooth={true}
//             offset={-100}
//             duration={1000}
//             onSetActive={(e, f) => handleSetActive(e, f)}
//           >
//             Test 1
//           </Link>
//         </div>

//         <p className="myP">
//           11111111Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef ufnf
//         </p>
//         <p className="myP">
//           2222222222 Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef
//           ufnf
//         </p>
//         <p className="myP">
//           33333333Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef ufnf
//         </p>

//         <Element name="test1" className="element-green">
//           test 1
//           <p className="myP">
//             4444444 Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef
//             ufnf
//           </p>
//         </Element>

//         <p className="myP">
//           5555555Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef ufnf
//         </p>
//         <p className="myP">
//           6666666666666Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef
//           ufnf
//         </p>
//       </div>

//       <style jsx global>{`
//         #example {
//           height: 100px;
//         }
//         .myP {
//           height: 200px;
//           padding: 30px;
//           border: 1px solid red;
//           margin: 30px;
//         }
//         .element-green {
//           border: 3px solid green;
//         }
//         .element-purple {
//           border: 3px solid purple;
//         }
//         body {
//           background-color: #eee;
//           overflow-y: scroll; /* Add the ability to scroll */
//         }

//         /* Hide scrollbar for Chrome, Safari and Opera */
//         body::-webkit-scrollbar {
//           display: none;
//         }

//         /* Hide scrollbar for IE, Edge and Firefox */
//         body {
//           -ms-overflow-style: none; /* IE and Edge */
//           scrollbar-width: none; /* Firefox */
//         }

//         .links {
//           display: flex;
//           flex: 1;
//           flex-direction: row;
//           position: fixed;
//           top: 0;
//           width: 300px;
//           height: 100px;
//           border: 1px solid blue;
//           padding: 50px;
//           box-sizing: border-box;
//         }
//       `}</style>
//     </React.Fragment>
//   );
// }

import {
  Link,
  animateScroll as scroll,
  Element,
  Button,
  scroller,
} from "react-scroll";

export default function App(props) {
  const handleSetActive = (e, f) => console.log({ e, f });
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const scrollTo = val => scroll.scrollTo(parseInt(val));

  const scrollToScroller = val => {
    // Somewhere else, even another file
    scroller.scrollTo("test1", {
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: "ContainerElementID",
      offset: 50, // Scrolls to element + 50 pixels down the page
    });
  };

  React.useEffect(() => {
    return () => {};
  }, []);
  return (
    <React.Fragment>
      <div id="example">
        <div className="links">
          <Link
            activeClass="element-purple"
            to="test1"
            spy={true}
            smooth="easeInOutQuart"
            offset={-100}
            duration={1500}
            onSetActive={(e, f) => handleSetActive(e, f)}
          >
            easeInOutQuart
          </Link>
          <Link
            activeClass="element-purple"
            to="test1"
            spy={true}
            smooth="easeInQuart"
            offset={-100}
            duration={1500}
            onSetActive={(e, f) => handleSetActive(e, f)}
          >
            easeInQuart
          </Link>
          <Link
            activeClass="element-purple"
            to="test1"
            spy={true}
            smooth="easeOutQuart"
            offset={-100}
            duration={1500}
            onSetActive={(e, f) => handleSetActive(e, f)}
          >
            easeOutQuart
          </Link>{" "}
          <Link
            activeClass="element-purple"
            to="test1"
            spy={true}
            smooth="easeInCubic"
            offset={-100}
            duration={1000}
            onSetActive={(e, f) => handleSetActive(e, f)}
          >
            easeInCubic
          </Link>
        </div>
        <div style={{ height: 200 }}></div>
        <button onClick={() => scrollToBottom()}>GO TO THE Bottom</button>
        <button onClick={() => scrollTo(100)}>GO TO THE 100</button>
        <button onClick={() => scrollToScroller("test1")}>
          GO TO THEtest1
        </button>
        <p className="myP">
          11111111Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef ufnf
        </p>
        <p className="myP">
          2222222222 Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef
          ufnf
        </p>
        <p className="myP">
          33333333Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef ufnf
        </p>{" "}
        <p className="myP">
          33333333Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef ufnf
        </p>{" "}
        <p className="myP">
          33333333Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef ufnf
        </p>
        <Element name="test1" className="element-green">
          test 1
          <p className="myP">
            4444444 Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef
            ufnf
          </p>
        </Element>
        <p className="myP">
          5555555Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef ufnf
        </p>
        <p className="myP">
          6666666666666Lorem ipisuim snudsndu sndusndunq efneufneuf eufnuen fuef
          ufnf
        </p>
        <button onClick={() => scrollToTop()}>GO TO THE TOp</button>
      </div>

      <style jsx global>{`
        #example {
          height: 100px;
        }
        .myP {
          height: 200px;
          padding: 30px;
          border: 1px solid red;
          margin: 30px;
        }
        .element-green {
          border: 3px solid green;
        }
        .element-purple {
          border: 3px solid purple;
        }
        body {
          background-color: #eee;
          overflow-y: scroll; /* Add the ability to scroll */
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        body::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        .links {
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: space-between;
          position: fixed;
          top: 0;
          width: 600px;
          height: 100px;
          border: 1px solid blue;
          padding: 50px;
          box-sizing: border-box;
        }
      `}</style>
    </React.Fragment>
  );
}
