# next-app

Opinionated structure for a SaaS app in Next.js

## How to run the project

1. Make sure you have node ~16 and npm installed
2. Clone repository then open terminal in root project directory
3. Run `yarn` (It will install all node packages). If you don't have yarn installed, then `run npm i -g yarn`
4. Make sure you have `.env` file in root directory
5. Run `npm run dev` and open `http://localhost:3000` on browser

## How to run the project

1. Make sure you have node ~16 and npm installed
2. Clone repository then open terminal in root project directory
3. Run `yarn` (It will install all node packages). If you don't have yarn installed, then `run npm i -g yarn`
4. Make sure you have `.env` file in root directory
5. Run `npm run dev` and open `http://localhost:3000` on browser

## Structure

```
├── pages
├── collections
│   ├── feature-1
│   └── feature-2
└── libs
    ├── assets
    ├── collections
    ├── components
    ├── data
    │   ├── dummy-data
    │   └── common
    ├── redux-store
    │   └── slicers
    ├── styles
    ├── theme
    ├── types
    │   ├── base
    │   ├── features
    │   │   └── feature-1
    │   │       ├── pages
    │   │       └── collection
    │   ├── components
    │   └── integrations
    └── utils
        ├── hooks
        └── utils.ts
```

## Style guide

- [Airbnb Javascript](https://airbnb.io/javascript/)
- [Airbnb React](https://airbnb.io/javascript/react/)

#### Naming conventions

|          | convention |
| -------- | ---------- |
| folder   | kebab-case |
| ts file  | kebab-case |
| tsx file | PascalCase |
| class    | PascalCase |
| variable | camelCase  |

## Commits and [Merge Requests](https://www.turing-tech.org/blog/merge-requests-your-reviewer-will-absolutely-love)

```
<type>(<scope>): <subject> // Short (50 chars or less) summary

<body> // More detailed explanatory text, if necessary. Bullet points are
okay, too.  Wrap it to about 72 characters or so.
```

`<scope>` is optional

#### Types

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

#### Example

```
feat(auth): integrated login api

- Applied validation on form
- Redirecting to home page on login
```

### Technologies

- Ant design 5
- Next 13
- Redux toolkit
