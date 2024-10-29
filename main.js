(function () {
    window.secretLuigisKey = "xxx";

    // Inject CSS file
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "styles.css"; // Replace with the path to your CSS file
    document.head.appendChild(link);

    // Inject JavaScript file
    var script = document.createElement("script");
    script.src = "autocomplete.js"; // Replace with the path to your JS file
    script.defer = true;
    document.head.appendChild(script);
})();
