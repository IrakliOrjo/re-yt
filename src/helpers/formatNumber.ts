export const formatNumber = (value: string | number): string => {

    const numberToFormat = typeof value === 'string' 
      ? parseFloat(value.replace(/,/g, ''))
      : value;

    if (isNaN(numberToFormat)) return '0';
    

    return new Intl.NumberFormat('en-US').format(numberToFormat);
  };