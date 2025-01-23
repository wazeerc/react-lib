# React Naming Conventions

> [!Note]  
> These are subjective as React does not have opiniated naming conventions.

## Overview

React does not enforce strict naming conventions, but following a consistent set of guidelines can enhance code readability and maintainability.

## Component Naming

- **PascalCase**: Use PascalCase for component names. This means capitalizing the first letter of each word without spaces.

```
const UserProfile = () => { /* component logic */ }
```


## File Naming

- **PascalCase**: Name your files using PascalCase to match the component name. This helps in easily identifying which file corresponds to which component.

- For a component named `UserProfile`, the file should be named `UserProfile.js`.

## Props Naming

- **Descriptive Names**: Use descriptive names for props to clearly indicate their purpose. Avoid abbreviations unless they are widely understood.

- Instead of `usr`, use `user`.

## State Variables

- **Prefixing**: Prefix state variables with `is`, `has`, or `should` to denote boolean values.

`isActive`, `hasError`, `shouldRender`.

- **State Update Functions**: Corresponding state update functions should follow a similar pattern.

 `setIsActive`, `setHasError`, `setShouldRender`.

## Event Handlers

- **handle Prefix**: Use `handle` as a prefix for event handler functions.

`handleClick`, `handleInputChange`.

## CSS Classes

- **Kebab-case**: Use lowercase letters and hyphens for CSS class names.

```
const API_URL = 'https://api.example.com';
```


## Utility Functions

- **Descriptive Names**: Choose descriptive names that indicate their purpose or functionality.

`formatDate`, `generateUniqueId`.

## Custom Hooks

- **use Prefix**: Custom hooks should start with the prefix `use`.

```
const useFetchData = () => { /* hook logic */ }
```
