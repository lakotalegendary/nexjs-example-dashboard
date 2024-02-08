import { Field, FieldConfig, Revenue } from './definitions';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const isArrayField = (value: any) => {
  return !!value && value.constructor === Array;
}

export const getType = (value: any) => {
	const valueToString = Object.prototype.toString;
	return valueToString.call(value).slice(7, -1).trim().toLowerCase();
}

export const getTree = (json: any, pathToNode = "root"): FieldConfig[]  => {
	let result: FieldConfig[] = []
	pathToNode = ~pathToNode.indexOf("root") ? pathToNode : "root"+pathToNode
	for(let key in json){
		const value = json[key]
		const type = getType(value);
		const path = `${pathToNode}.${key}`;
		if(type === 'number' || type === 'string' || type === 'null') {
			result.push({ type, path });
		}
		if(type === 'object') {
			const childs = getTree(json[key], path)
      result = [...result, ...childs];
		}
		if(type === 'array') {
			
			const length = json[key].length;
			if(!length) {
				result.push({ type, length, path })
				continue;
			}
			const itemType = getType(value[0]);
			if(itemType === 'number' || itemType === 'string' || itemType === 'null') {
				result.push({
					type: itemType,
					length: length,
					path: path
				})
			}
			if(itemType === 'object') {
				result.push({
					type: type,
					length: length,
					path: path,
				})
				const childs = getTree(value[0], path)
				result = [...result, ...childs];
			}
		}
	}
	return result.flat(Infinity);
}

export const processField = (key: string, schema: any, parent: any) => {
  let result = [];
	const value = schema[key];
	const { type, items, properties } = value;
	console.log(`
    key: ${key}
    type: ${type}
    ${parent? `parent: ${parent}` : '' }
  `)
  
	if(items) {
		console.log(`its array of ${items.type}`)
		if(items.type === 'object') 
			for(let k in properties) {
				processField(k, properties, key)
			}
	}
	if(properties) {
		console.log(`its object, process childs`)
		for(let k in properties) {
			processField(k, properties, key)
		}
	}
}
