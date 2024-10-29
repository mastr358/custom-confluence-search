(function () {
    // Create a wrapper div for styling
    var wrapper = document.createElement("div");
    wrapper.id = "luigi-autocomplete-wrapper";

    // Create and insert an input field inside the wrapper
    var input = document.createElement("input");
    input.id = "luigi-autocomplete-input";
    input.type = "text";
    input.placeholder = "Search through Luigisbox...";

    // Append input to the wrapper, then wrapper to body
    wrapper.appendChild(input);
    document.body.insertBefore(wrapper, document.body.firstChild);

    // Create a button to toggle the input field
    var toggleButton = document.createElement("button");
    toggleButton.id = "luigi-toggle-button";
    toggleButton.innerHTML = ">>";

    // Append the button to the wrapper
    wrapper.appendChild(toggleButton);

    // Add event listener to the button to toggle the input field
    toggleButton.addEventListener("click", function () {
        if (input.classList.contains("collapsed")) {
            input.classList.remove("collapsed");
            toggleButton.innerHTML = ">>";
            document
                .querySelector(".luigi-ac")
                .classList.remove("luigi-hidden");
        } else {
            toggleButton.innerHTML = ">>";
            input.classList.add("collapsed");
            document.querySelector(".luigi-ac").classList.add("luigi-hidden");
        }
    });

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
                "#luigi-autocomplete-input"
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
            var luigiAcDropdown = document.querySelector(".luigi-ac");
            if (luigiAcDropdown) {
                luigiAcDropdown.classList.add("luigi-hidden");
            }
        }
    });

    // Show modal on click on the input
    input.addEventListener("click", function () {
        var luigiAcDropdown = document.querySelector(".luigi-ac");
        if (luigiAcDropdown) {
            luigiAcDropdown.classList.remove("luigi-hidden");
        }
    });
})();
