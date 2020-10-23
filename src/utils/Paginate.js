import _ from "lodash";

export function Paginate({ data, size, pageNumber }) {
  const startIndex = (pageNumber - 1) * size;
  return _(data).slice(startIndex).take(size).value();
}
