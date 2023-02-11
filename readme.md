<!-- @format -->

<script src="https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js"></script>
<script>
  fetch(
    "https://raw.githubusercontent.com/harakun24/assets-neobiz/main/readme.md"
  )
    .then((e) => e.text())
    .then((e) => {
      var converter = new showdown.Converter(),
        text = e;
      try {
        document.getElementById("readme").innerHTML = converter.makeHtml(text);
      } catch {
        const t = document.createElement("a");
        t.setAttribute(
          "href",
          "https://raw.githubusercontent.com/harakun24/assets-neobiz/main/readme.md"
        );
        t.innerText = "Go to readme";
        document.querySelector("body").append(t);
      }
    });
</script>
