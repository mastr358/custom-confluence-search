(function () {
    function createWrapper() {
        var wrapper = document.createElement("div");
        wrapper.id = "luigi-autocomplete-wrapper";
        return wrapper;
    }

    function createInput() {
        var input = document.createElement("input");
        input.id = "luigi-autocomplete-input";
        input.type = "text";
        input.placeholder = "Search through Luigisbox...";
        return input;
    }

    function createToggleButton() {
        var toggleButton = document.createElement("button");
        toggleButton.id = "luigi-toggle-button";
        toggleButton.innerHTML = ">>";
        return toggleButton;
    }

    function toggleInputField(input, toggleButton) {
        if (input.classList.contains("collapsed")) {
            input.classList.remove("collapsed");
            toggleButton.innerHTML = ">>";
            document
                .querySelector(".luigi-ac")
                .classList.remove("luigi-hidden");
        } else {
            input.classList.add("collapsed");
            toggleButton.innerHTML = "<<";
            document.querySelector(".luigi-ac").classList.add("luigi-hidden");
        }
    }

    function initializeAutocomplete() {
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
    }

    function loadAutocompleteScript() {
        var script = document.createElement("script");
        script.src = "https://cdn.luigisbox.com/autocomplete.js";
        script.async = true;
        script.onload = initializeAutocomplete;
        document.head.appendChild(script);
    }

    function hideModalOnClickOutside(wrapper) {
        document.addEventListener("click", function (event) {
            if (!wrapper.contains(event.target)) {
                var luigiAcDropdown = document.querySelector(".luigi-ac");
                if (luigiAcDropdown) {
                    luigiAcDropdown.classList.add("luigi-hidden");
                }
            }
        });
    }

    function showModalOnClick(input) {
        input.addEventListener("click", function () {
            var luigiAcDropdown = document.querySelector(".luigi-ac");
            if (luigiAcDropdown) {
                luigiAcDropdown.classList.remove("luigi-hidden");
            }
        });
    }

    function init() {
        var wrapper = createWrapper();
        var input = createInput();
        var toggleButton = createToggleButton();

        wrapper.appendChild(input);
        wrapper.appendChild(toggleButton);
        document.body.insertBefore(wrapper, document.body.firstChild);

        toggleButton.addEventListener("click", function () {
            toggleInputField(input, toggleButton);
        });

        loadAutocompleteScript();
        hideModalOnClickOutside(wrapper);
        showModalOnClick(input);
    }

    init();
})();
