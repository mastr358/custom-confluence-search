(function () {
    // Create a wrapper div for styling
    var wrapper = document.createElement("div");
    wrapper.id = "autocomplete-wrapper";

    // Create and insert an input field inside the wrapper
    var input = document.createElement("input");
    input.id = "autocomplete-input";
    input.type = "text";
    input.placeholder = "Search through Luigisbox...";

    // Append input to the wrapper, then wrapper to body
    wrapper.appendChild(input);
    document.body.insertBefore(wrapper, document.body.firstChild);

    window.LBInitAutocomplete = function () {
        if (typeof AutoComplete !== "undefined") {
            AutoComplete(
                {
                    TrackerId: window.secretLuigisKey,
                    Layout: "line",
                    Locale: "en",
                    Types: [
                        {
                            type: "page",
                            name: "Pages",
                            size: 8,
                            attributes: ["ancestors", "last_edited"],
                        },
                    ],
                },
                "#autocomplete-input"
            );
        } else {
            console.error(
                "LuigisBoxAutocomplete is not available after loading the script."
            );
        }
    };

    // Load Luigi's Box Autocomplete script
    var script = document.createElement("script");
    script.src = "https://cdn.luigisbox.com/autocomplete.js";
    script.async = true;
    script.onload = function () {
        LBInitAutocomplete();
    };
    document.head.appendChild(script);

    // Hide modal on click outside of it
    document.addEventListener("click", function (event) {
        var isClickInside = wrapper.contains(event.target);
        if (!isClickInside) {
            input.value = ""; // Clear the input field
            var luigiAcDropdown = document.querySelector(".luigi-ac");
            if (luigiAcDropdown) {
                luigiAcDropdown.style.display = "none";
            }
        }
    });

    // Show modal on click on the input
    input.addEventListener("click", function () {
        var luigiAcDropdown = document.querySelector(".luigi-ac");
        if (luigiAcDropdown) {
            luigiAcDropdown.style.display = "block";
        }
    });
})();
