function setInactive() {
  var containers = document.querySelectorAll('.preview-container');
  for (var i = 0; i < containers.length; i++) {
    containers[i].classList.add('preview-inactive');
  }
}

Template.chartEditPreviewSingle.events({
  "blur .editable-chart_title": function(event) {
    event.preventDefault();
    var input = event.target.innerText;
    var text = removeNbsp(input).trim();
    setInactive();
    updateAndSave("updateHed", this.data, text);
  },
  "blur .editable-chart_qualifier": function(event) {
    event.preventDefault();
    var input = event.target.innerText;
    var text = removeNbsp(input).trim();
    setInactive();
    updateAndSave("updateQual", this.data, text);
  },
  "click .editable-chart_source": function(event) {
    event.preventDefault();
    var currText = event.target.textContent.trim();
    if (currText === app_settings.chart.source || currText === "") {
      event.target.textContent = app_settings.chart.source + app_settings.source_suffix;
    }
    cursorManager.setEndOfContenteditable(event.target);
  },
  "blur .editable-chart_source": function(event) {
    event.preventDefault();
    var currText = event.target.textContent;
    var text;
    if (currText === app_settings.chart.source + app_settings.source_suffix || currText === "") {
      event.target.textContent = app_settings.chart.source;
      text = app_settings.chart.source
    } else {
      text = removeNbsp(currText).trim();
    }
    setInactive();
    updateAndSave("updateSource", this.data, text);
  }
});

Template.chartEditPreviewSingle.rendered = function() {

  this.autorun(function(comp) {

    var dataContext = Template.currentData();

    if (!dataContext) { return; }

    if (dataContext.data) {

      var data = dataContext.data;

      data.editable = true;

      Tracker.afterFlush(function() {
        data.drawFinished = function(chart) {
          var el = document.querySelector('.' + dataContext.type + '-preview-container');
          el.classList.remove('preview-inactive');
        };
        drawChart('.' + dataContext.type + '-preview-container', data);
      });

    }

  });
}
