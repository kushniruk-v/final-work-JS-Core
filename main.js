$(function () {
  let rows = 4,
    colums = 4;
  let pieces = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < colums; j++) {
      pieces += "<div style class='pieces ' ></div>";
    }
  }
  $(".result-puzzel").html(pieces);

  $("#start").click(function () {
    event.preventDefault();

    let timer2 = "01:00";
    let interval = setInterval(function () {
      let timer = timer2.split(":");

      let minutes = parseInt(timer[0], 10);
      let seconds = parseInt(timer[1], 10);
      --seconds;
      minutes = seconds < 0 ? --minutes : minutes;
      if (minutes < 0) clearInterval(interval);
      if (seconds == 0) {
        $(".time").html((minutes = "00:00"));
        $(".result-2").slideDown();
        return;
      }
      seconds = seconds < 0 ? 59 : seconds;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      $(".time").html(minutes + "0" + ":" + seconds);
      timer2 = minutes + ":" + seconds;

      $("#close-2").click(function () {
        clearInterval(interval);
      });
    }, 1000);

    $(".time2").addClass("time").css({});

    let onOff = false;

    if (onOff == false) {
      $("#start").disabled = true;
      onOff = true;
    }
    $("#start").prop("disabled", true);
    $("#start").css("background-color", `rgb(165, 104, 104)`);

    $(".piece").draggable();
    $(".pieces").droppable({
      drop: function (event, ui) {
        let dragElem = ui.draggable;
        let droppedOn = $(this);

        $(dragElem)
          .addClass("pieces")
          .css({
            top: 0,
            left: 0,
            position: "reletive",
          })
          .appendTo(droppedOn);
      },
    });

    $("#check").prop("disabled", false);
    $("#check").css("background-color", `rgb(255, 0, 0)`);
  });

  // click check result

  $("#check").click(function () {
    event.preventDefault();
    $(".result").slideDown(function () {
      $("body").css({
        backgroundColor: "rgb(199, 197, 197)",
      });
    });
  });

  // click close
  $("#close").click(function () {
    $(".result").slideUp(function () {
      $("body").css({
        backgroundColor: "white",
      });
    });
  });

  // click check

  $("#check-res").click(function () {
    $(".time2").css({
      display: "none",
    });

    $("#close-2").css({
      display: "block",
    });

    $("#close").css({
      display: "none",
    });
    $("#check-res").css({
      display: "none",
    });

    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let check = true;
    for (let i = 0; i < $(".piece").length; i++) {
      if ($(".piece").eq(i).text() != array[i]) {
        check = false;
        break;
      }
    }
    if (check) {
      $("p").text("Woohoo, well done, you did it!");
    } else {
      $("p").text("It's a pity, but you lost");
    }
    check = true;
  });

  $("#close-2").click(function () {
    // location.reload()
    $(".result").slideUp();
    $("body").css({
      backgroundColor: "white",
    });
    $("#check").prop("disabled", true);
    $("#check").css("background-color", `rgb(165, 104, 104)`);
    $("#start").prop("disabled", false);
    $("#start").css("background-color", `rgb(255, 0, 0)`);
  });

  $("#close-3").click(function () {
    location.reload();
    $(".result-2").slideUp();
  });

  // click new game

  $("#new").click(function () {
    $(".time").html("01:00");

    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    array.sort(function (a, b) {
      return 0.5 - Math.random();
    });

    $(".piece-puzzel").html("");
    for (let i = 0; i < array.length; i++) {
      $(".piece-puzzel").append(
        "<div id='piece" + array[i] + "' class = 'piece'></div"
      );
    }
  });
});
