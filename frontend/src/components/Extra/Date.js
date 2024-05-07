export const dateFormat = ( timestamp) => {
    // const date = new Date(timestamp);

    // const options = {
    //     day: "numeric",
    //     month: "short",
    //     year: "numeric",
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     hour12: false
    // };

    // const formattedDate = date.toLocaleString("en-US", options);

    // console.log("Formatted Date:", formattedDate);
    // return formattedDate
    const currentDate = new Date();
    const messageDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - messageDate.getTime();
    const secondsDifference = timeDifference / 1000;
    const minutesDifference = secondsDifference / 60;
    const hoursDifference = minutesDifference / 60;
    const daysDifference = hoursDifference / 24;

    if (secondsDifference < 60) {
        return "Now";
    } else if (minutesDifference < 60) {
        return `${Math.floor(minutesDifference)} minute${Math.floor(minutesDifference) > 1 ? 's' : ''} ago`;
    } else if (hoursDifference < 24) {
        return `${Math.floor(hoursDifference)} hour${Math.floor(hoursDifference) > 1 ? 's' : ''} ago`;
    } else if (daysDifference < 7) {
        return `${Math.floor(daysDifference)} day${Math.floor(daysDifference) > 1 ? 's' : ''} ago`;
    } else {
        const options = {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        };
        return messageDate.toLocaleString("en-US", options);
    }
}