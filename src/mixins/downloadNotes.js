export default {
  methods: {
    downloadNotes(fileData, extension) {
      var blob = new Blob([fileData], {
        type: `application/${extension}`,
      });

      let fileName = "";
      if (extension === "json") fileName = Object.keys(JSON.parse(fileData))[0];
      else if (extension === "txt") fileName = fileData.split("\n")[0];

      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${fileName}.${extension}`;
      link.click();
      link.remove();
    },
  },
};
