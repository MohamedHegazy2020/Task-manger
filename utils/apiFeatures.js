export const apiFeature = (dataList, options) => {  
    let filteredDataList = [...dataList];  
  
    // Filtering  
    if (options.filterByCategoryName) {  
      filteredDataList = filteredDataList.filter(item => item.categoryId.name === options.filterByCategoryName);  
    }  
    if (options.filterByShared) {  
      filteredDataList = filteredDataList.filter(item => item.shared === options.filterByShared);  
    }  
  
    // Sorting  
    if (options.sortBy === "categoryName") {  
      filteredDataList.sort((a, b) => a.categoryId.name.localeCompare(b.categoryId.name));  
    } else if (options.sortBy === "shared") {  
      filteredDataList.sort((a, b) => a.shared.localeCompare(b.shared));  
    }  
  
    // Pagination  
    const page = parseInt(options.page) || 1;  
    const limit = parseInt(options.limit) || 10;  
    const startIndex = (page - 1) * limit;  
    const endIndex = startIndex + limit;  
    filteredDataList = filteredDataList.slice(startIndex, endIndex);  
  
    return filteredDataList;  
  };  
  
  