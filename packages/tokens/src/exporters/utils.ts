
/**
 * Utility functions for CSS Variable exporting
 */

/**
 * Converts a string to kebab-case
 * - "fontSize" -> "font-size"
 * - "text_primary" -> "text-primary"
 * - spaces to "-"
 * - collapses multiple "-" -> "-"
 */
export function kebabCase(input: string): string {
    return input
        // Replace camelCase with kebab-case (insert hyphen before uppercase)
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        // Replace underscores and spaces with hyphens
        .replace(/[_\s]+/g, "-")
        // Remove invalid characters (keep alphanumeric and hyphens)
        .replace(/[^a-zA-Z0-9-]/g, "")
        // Collapse multiple hyphens
        .replace(/-+/g, "-")
        // Convert to lowercase
        .toLowerCase();
}

/**
 * Flattens a nested object into a list of [variableName, value] pairs.
 * 
 * @param obj The object to flatten
 * @param options Configuration options
 * @returns Array of [varName, value]
 */
export function flattenToVars(
    obj: unknown,
    options: {
        prefix: string;
        dropRoots?: string[];
        path?: string[];
    }
): Array<[varName: string, value: string]> {
    const { prefix, dropRoots = [], path = [] } = options;
    const vars: Array<[string, string]> = [];

    if (obj === null || obj === undefined) {
        return vars;
    }

    // If leaf node (string or number)
    if (typeof obj === 'string' || typeof obj === 'number') {
        // Construct the full path
        // Filter out root keys if they match dropRoots
        const filteredPath = path.filter((part, index) => {
            // If it's the first item and in dropRoots, skip it
            if (index === 0 && dropRoots.includes(part)) {
                return false;
            }
            return true;
        });

        const suffix = kebabCase(filteredPath.join("-"));

        // Ensure the prefix starts with '--'
        const safePrefix = prefix.startsWith("--") ? prefix : `--${prefix}`;
        // If prefix doesn't end with hyphen and suffix doesn't start with one, add it?
        // Actually the requirement says prefix default "--ds-". 
        // Usually prefix includes the trailing dash if needed.
        // Let's assume the user provides a prefix like "--ds-".
        // But let's be safe: if prefix ends in -, and suffix starts with -, avoid double?
        // The previous implementation of kebabCase handles internal dashes.
        // Let's just concatenate.

        const varName = `${safePrefix}${suffix}`;

        vars.push([varName, String(obj)]);
        return vars;
    }

    // If object, recurse
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        for (const [key, value] of Object.entries(obj)) {
            vars.push(
                ...flattenToVars(value, {
                    prefix,
                    dropRoots,
                    path: [...path, key]
                })
            );
        }
    }

    return vars;
}

/**
 * Merges two lists of variables, resolving conflicts.
 * Arrays are expected to be "stable" ordered lists of [name, value].
 * 
 * @param varsA First list of vars
 * @param varsB Second list of vars
 * @param opts Options
 */
export function mergeVars(
    varsA: Array<[string, string]>,
    varsB: Array<[string, string]>,
    opts: { prefer?: "A" | "B" } = { prefer: "B" }
): Array<[string, string]> {
    const map = new Map<string, string>();

    // Helper to add vars to map according to preference strategy
    // But wait, "prefer B" means if A has varX and B has varX, B wins.
    // So we can just add A then add B (for prefer B).
    // Or B then A (for prefer A).

    const sequence = opts.prefer === 'A'
        ? [varsB, varsA]
        : [varsA, varsB];

    for (const list of sequence) {
        for (const [name, value] of list) {
            map.set(name, value);
        }
    }

    // Convert back to array and sort by name
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}
