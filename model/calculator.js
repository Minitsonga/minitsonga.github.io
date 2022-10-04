const liste = (...args) => document.querySelectorAll(...args);
const screen = document.querySelector(".screen");

let total = 0;
let prev_calcul = "";
let cur_calcul = "";

function evil(fn) {
  return new Function("return " + fn)();
}

liste("button").forEach((element) => {
  element.addEventListener("click", () => {
    switch (element.firstChild.innerHTML.toLowerCase()) {
      case "ac":
        prev_calcul = "";
        cur_calcul = "0";
        total = 0;
        screen.innerHTML = `<p>${cur_calcul}</p>`;
        break;
      case "del":
        if (cur_calcul === "ERROR") {
          prev_calcul = "";
          cur_calcul = "0";
          total = 0;
          screen.innerHTML = `<p>${cur_calcul}</p>`;
        }
        if (cur_calcul.length > 0) {
          cur_calcul = cur_calcul.slice(0, -1);
        }

        break;
      case "=":
        try {
          if (cur_calcul.charAt(0) === "." && prev_calcul.length > 0)
            return error;

          total = isNaN(cur_calcul.charAt(0))
            ? evil(prev_calcul + cur_calcul)
            : evil(cur_calcul);
          prev_calcul = total.toString();
          cur_calcul = "";
        } catch (error) {
          cur_calcul = "ERROR";
          total = 0;
        }

        break;

      default:
        cur_calcul += element.firstChild.innerHTML.toLowerCase();

        break;
    }
    if (prev_calcul.length > 0) {
      screen.style = "";
      screen.innerHTML = `<p>  ${prev_calcul}</p>\n <p>${cur_calcul} </p>`;
    } else {
      screen.style.flexDirection = "unset";
      screen.style.alignItems = "center";
      screen.firstChild.innerHTML = cur_calcul;
    }
  });
});
