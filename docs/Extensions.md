# Building Extensions for CodeClimbers

Extensions are a powerful way to contribute to CodeClimbers and enhance its functionality. This guide will help you understand how to create and integrate your own extensions into the project.

## What are Extensions?

Extensions in CodeClimbers serve two main purposes:

1. Dashboard Widgets: Custom components that can be embedded in a user's dashboard, allowing for greater personalization.
2. Event-Driven Logic: Additional functionality that responds to specific events in the browser (e.g., adding notifications for particular actions).

## Getting Started

Before diving into extension development, make sure you've set up the project locally. Refer to the [Contributing](./Contributing.md) documentation for instructions on getting the development environment ready.

Look at the [Extensions Service](../packages/app/src/services/extensions.service.ts) to get an idea of what's possible by viewing existing extensions.

## Creating an Extension

### 1. Set Up the Extension Directory

Create a new directory for your extension in the `src/extensions` folder. The directory name should match the ID of your extension:

`src/extensions/YourExtensionName/`

### 2. Create the Main Component

In your extension directory, create an `index.tsx` file. This will export the main React component for your extension:

```typescript
// src/extensions/YourExtensionName/index.tsx
import React from 'react'

interface Props {
  date: Date
  refresh: () => void
}

const YourExtension: React.FC<Props> = ({ date, refresh }) => {
  return (
    <div>
      <h2>Your Extension</h2>
      <p>Selected date: {date.toDateString()}</p>
      <button onClick={refresh}>Refresh Data</button>
    </div>
  )
}

export default YourExtension
```

### 3. Register the Extension

Add your extension to the `extensions` array in `src/services/extensions.service.ts`:

```typescript
// src/services/extensions.service.ts
import YourExtension from "../extensions/YourExtensionName";
const extensions: (Extension | DashboardExtension)[] = [
  // ... existing extensions
  {
    id: "YourExtensionName",
    name: "Your Extension Display Name",
    authorName: "Your Name",
    authorUrl: "https://github.com/yourusername",
    description: "A brief description of your extension.",
    component: YourExtension,
    route: "/your-extension",
    pageComponent: YourExtensionPage, // If you have a full-page component
    onAdd: () => {
      // Optional: Logic to run when the extension is added
    },
  },
];
```

## Best Practices

1. **Responsive Design**: Ensure your extension looks good on various screen sizes.
2. **Error Handling**: Implement proper error handling and provide fallback UI when data is unavailable.
3. **Consistent Styling**: Use Material-UI components and follow the existing design patterns in the project.
4. **TypeScript**: Write your extension in TypeScript for better type safety and developer experience.

## Examples

For inspiration, look at existing extensions in the project:

- `SqlSandbox`: A complex extension that provides SQL query functionality (`src/extensions/SqlSandbox/`).
- Other extensions in the `src/extensions/` directory.

## Testing Your Extension

1. Implement your extension following the patterns described above.
2. Add it to the `extensions` array in `extensions.service.ts`.
3. Run the application locally and navigate to the Extensions page to enable your extension.
4. Test thoroughly, including edge cases and error scenarios.

## Submitting Your Extension

Once your extension is ready:

1. Create a new branch for your extension.
2. Commit your changes and push to your fork.
3. Open a pull request with a clear description of your extension and its functionality.
4. Respond to any feedback from the maintainers during the review process.

We're excited to see what you'll build to enhance CodeClimbers! If you have any questions during the development process, don't hesitate to reach out to the maintainers or the community for support.
