export function parseLinkHeader(link: any) {
  var linkexp = /<[^>]*>\s*(\s*;\s*[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*")))*(,|$)/g;
  var paramexp = /[^\(\)<>@,;:"\/\[\]\?={} \t]+=(([^\(\)<>@,;:"\/\[\]\?={} \t]+)|("[^"]*"))/g;

  var matches = link.match(linkexp);
  var rels: any = {};
  for (var i = 0; i < matches.length; i++) {
    var split = matches[i].split(">");
    var href = split[0].substring(1);
    var ps = split[1];
    var s = ps.match(paramexp);
    for (var j = 0; j < s.length; j++) {
      var p = s[j];
      var paramsplit = p.split("=");
      var name = paramsplit[0];
      var rel = paramsplit[1].replace(/["']/g, "");
      rels[rel] = href;
    }
  }
  return rels;
}

export function appendQueryString(
  url: string,
  queryVars: { [key: string]: string }
): string {
  var firstSeperator = url.indexOf("?") == -1 ? "?" : "&";
  var queryStringParts = new Array();
  for (var key in queryVars) {
    queryStringParts.push(key + "=" + queryVars[key]);
  }
  var queryString = queryStringParts.join("&");
  return url + firstSeperator + queryString;
}
