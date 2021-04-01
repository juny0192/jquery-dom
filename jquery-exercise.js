let movieNum = 0;
let movieList = [];

$(function () {
  $("#submit").on("click", function (e) {
    e.preventDefault();

    const title = $("#title").val();
    const rate = $("#rate").val();

    let movieInfo = { title, rate, movieNum };

    movieNum++;
    movieList.push(movieInfo);

    const HTMLAppend = makeMovieDataHTML(movieInfo);

    $("#movie-list-table").append(HTMLAppend);
  });

  $("tbody").on("click", "#remove", function (e) {
    let movieRmvNum = movieList.findIndex(
      (movie) => movie.movieNum === $(e.target).data("movieNumber")
    );

    movieList.splice(movieRmvNum, 1);

    $(e.target).closest("tr").remove();
  });

  $(".fas").on("click", function (evt) {
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    $("#movie-list-table").empty();

    for (let movies of sortedMovies) {
      const HTMLAppend = makeMovieDataHTML(movies);

      $("#movie-list-table").append(HTMLAppend);
    }

    $(e.target).toggleClass("fa-sort-down");
    $(e.target).toggleClass("fa-sort-up");
  });
});

function makeMovieDataHTML(movieinfo) {
  return `
    <tr>
        <td>${movieinfo.title}</td>
        <td>${movieinfo.rate}</td>
        <td>
            <button id="remove" class="btn btn-danger" data-movie-number=${movieinfo.movieNum}>
            Remove
            </button>
        </td>
    </tr>
    `;
}

function sortBy(arr, keyToSortBy, direction) {
  return arr.sort(function (a, b) {
    if (keyToSortBy === "rate") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

// const arrSpl = [
//   { title: "c movie", rate: "6", movieNum: 0 },
//   { title: "a movie", rate: "4", movieNum: 1 },
//   { title: "h movie", rate: "2", movieNum: 2 },
// ];

// function sorting(arr, keyToSortBy, direction) {
//   return arr.sort(function (a, b) {
//     if (keyToSortBy === "rate") {
//       a[keyToSortBy] = +a[keyToSortBy];
//       b[keyToSortBy] = +b[keyToSortBy];
//     }

//     if (a[keyToSortBy] > b[keyToSortBy]) {
//       return direction === "up" ? 1 : -1;
//     } else if (a[keyToSortBy] < b[keyToSortBy]) {
//       return direction === "up" ? -1 : 1;
//     }
//     return 0;
//   });
// }
