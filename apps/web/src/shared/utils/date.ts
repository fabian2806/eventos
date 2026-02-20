export function formatDate(dateString: string) {
    const date = new Date(dateString);

    let weekday = date
        .toLocaleDateString("es-PE", { weekday: "short" })
        .replace(".", "")
    const weekdayUC = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    const day = date.getDate().toString().padStart(2, "0");

    let month = date
        .toLocaleDateString("es-PE", { month: "short" })
        .replace(".", "")
    const monthUC = month.charAt(0).toUpperCase() + month.slice(1);

    const time = date.toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${weekdayUC} ${day} ${monthUC} · ${time}`;
}