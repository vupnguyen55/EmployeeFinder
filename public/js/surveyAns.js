$(function () {

  const surveyAns = function (event) {
    event.preventDefault();

    const surveyArr = [
      parseInt($('#q1').val().trim(),10),
      parseInt($('#q2').val().trim(),10),
      parseInt($('#q3').val().trim(),10),
      parseInt($('#q4').val().trim(),10),
      parseInt($('#q5').val().trim(),10),
      parseInt($('#q6').val().trim(),10),
      parseInt($('#q7').val().trim(),10),
      parseInt($('#q8').val().trim(),10),
      parseInt($('#q9').val().trim(),10),
      parseInt($('#q10').val().trim(),10)
    ];

    console.log(surveyArr);


    $.ajax({
      method: 'GET',
      url: '/api/employeesList',
    }).then(function (response) {
      let resArr = [];
      let resDiff = [];
      for (let i = 0; i < response.length; i++) {
        resArr.push(response[i].scores);
      }
      resArr.forEach(function (values) {
        for (let i = 0; i < resArr.length; i++) {
          resDiff.push(Math.abs(values[i] - surveyArr[i]));
        }
      })
      // console.log(resDiff);
      let e = [];
      for (let i = 0; i < 10; i++) {
        e[i] = resDiff.splice(0, 10)
      }
      console.log(e);

      let sumArr = [];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let resSum = surveyArr.reduce(reducer);
      for (let i = 0; i < e.length; i++) {
        sumArr.push(e[i].reduce(reducer));
      }
      console.log(sumArr);
      console.log(resSum);

      let match = Math.min.apply(null, sumArr)
      console.log(match);
      let index = sumArr.indexOf(match);
      console.log(index);

      $(".modal-title").html(`${response[index].name}`);
      $(".modal-body").html(`<img class="modIMG" src = "${response[index].photo}">`);
    })
  }
  $('#submitBut').on('click', surveyAns);
});