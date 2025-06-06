# ADR 0001: TypeScript Adoption

## Status

Proposed

## Context

The application is currently using JavaScript with React. While the project already has some TypeScript-related dependencies installed (`@types/react` and `@types/react-dom`), the codebase itself is not fully utilizing TypeScript's features. This creates several challenges:

1. Lack of type safety leads to potential runtime errors that could be caught during development
2. Reduced developer experience due to missing IDE support for type checking and autocompletion
3. Difficulty in maintaining and refactoring code without type information
4. Inconsistent code structure due to the absence of type definitions

## Decision

We will adopt TypeScript as the primary language for the music-tracks application. This includes:

1. Converting all existing `.js` and `.jsx` files to `.ts` and `.tsx`
2. Adding proper type definitions for all components, functions, and data structures
3. Configuring TypeScript compiler options for optimal development experience
4. Setting up proper ESLint rules for TypeScript
5. Adding type checking to the CI/CD pipeline

## Considered Alternatives

1. **PropTypes (React’s built-in runtime type checking)**
   - Pros:
      - Minimal configuration; already bundled with React
      - Runtime validation of component props
   - Cons:
      - Only validates props at runtime (not function signatures or data models)
      - No IDE support for non‐component code; limited to React components
      - Less comprehensive than a full-blown type system

2. **Validation Libraries (e.g. Joi, Zod)**
   - Pros:
      - Strong runtime schema validation for API inputs/outputs
      - Can be used both on client and server
   - Cons:
      - Still requires manual checks at each boundary; no compile-time guarantees
      - Additional learning curve for schema definitions
      - Doesn’t provide IDE autocompletion or enforce types across the entire codebase

3. **Plain JavaScript with JSDoc Annotations**
   - Pros:
      - Can add JSDoc comments to get some IDE hints without full migration
      - No build-step changes required
   - Cons:
      - JSDoc-based type hints are less strict and can be bypassed
      - Lacks enforcement anywhere beyond the developer’s editor; no CI-level type checking

4. **Staying on Plain JavaScript without Additional Checks**
   - Pros:
      - No migration effort; zero upfront cost
   - Cons:
      - Continues to allow many potential runtime errors
      - No improvement in IDE support or refactoring safety

After evaluating these options, we conclude that **TypeScript** provides the strongest compile-time guarantees, IDE integration, and long-term maintainability for our codebase. While PropTypes and schema validators catch some issues at runtime, they cannot enforce correct types throughout the application or prevent synchronous runtime errors. JSDoc helps with hints, but it’s not as reliable as a full type system. Therefore, we will adopt TypeScript.

## Consequences

### Positive

- Improved code quality through static type checking
- Better developer experience with enhanced IDE support
- Easier refactoring and maintenance
- Better documentation through type definitions
- Reduced runtime errors
- Improved team collaboration through explicit interfaces

### Negative

- Initial overhead of converting existing JavaScript code to TypeScript
- Learning curve for team members not familiar with TypeScript
- Slightly more verbose code due to type annotations
- Additional build step for type checking

### Neutral

- Need to maintain TypeScript configuration
- Regular updates of type definitions for dependencies

## Implementation Plan

1. Add TypeScript configuration (`tsconfig.json`) and enable `"strict": true`
2. Convert existing files gradually, starting with core components (starting from `common` components, `api` requests and `hooks`). For any complex migrations, temporarily suppress individual errors with `// @ts-ignore` but add a TODO to remove it before merging to `main`.
3. Add type definitions for external dependencies
4. Update build and development scripts
5. Add TypeScript-specific ESLint rules
6. Update CI/CD pipeline to include type checking


### Strict Mode Rationale

We will enable `"strict": true` in `tsconfig.json` because:

- **No implicit any** (`noImplicitAny`): Forces every variable, function parameter, and return type to have an explicit type. This prevents accidentally falling back to `any` and hiding type errors.  
- **Strict null checks** (`strictNullChecks`): Ensures `null`/`undefined` are not silently allowed. Helps catch possible `undefined` or `null` dereferences at compile time.  
- **Catch hidden bugs early**: Other strict flags (like `strictFunctionTypes`, `alwaysStrict`) collectively enforce consistent signatures, making refactoring safer and avoiding edge-case runtime errors.

To put it simply, “strict” means the compiler will refuse to compile code that might lead to common runtime type errors. Though it increases initial migration effort, it greatly improves long-term maintainability and safety.


## References

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/) 