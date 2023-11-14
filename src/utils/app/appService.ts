export const activePath = (currentRoute: string, pathToMatch: string) => {
  const pathArr = currentRoute.split('/');

  return pathArr[1] === pathToMatch;
};

export const addDocumentClass = (classList: string[]) => {
  classList.forEach((className) =>
    document.documentElement.classList.add(className)
  );
};

export const removeDocumentClass = (classList: string[]) => {
  classList.forEach((className) =>
    document.documentElement.classList.remove(className)
  );
};

export const addBodyClass = (classList: string[]) => {
  classList.forEach((className) => document.body.classList.add(className));
};

export const removeBodyClass = (classList: string[]) => {
  classList.forEach((className) => document.body.classList.remove(className));
};

export const getModalConfig = () => {
  const config = {
    action: '',
    body: {
      html: false,
      text: 'This is some sample modal text.',
    },
    buttons: [
      {
        action: '',
        class: 'btn-primary',
        spinner: true,
        text: 'Confirm',
      },
      {
        action: '',
        class: 'btn-white',
        text: 'Cancel',
      },
    ],
    component: null,
    header: {
      center: false,
      close: true,
      title: 'This is the title',
    },
    open: true,
    required: false,
    spinner: false,
    width: 'max-w-sm',
  };

  return config;
};

export const formatLocaleDate = (val: string) => {
  const date = new Date(val);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en', options);
};

export const capitalize = (text: string) => {
  return text
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const waitUntil = (condition: any) => {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (!condition()) {
        return;
      }

      clearInterval(interval);
      resolve();
    }, 100);
  });
};

export const isNullOrUndefined = (input: any) => {
  return input === undefined || input === null;
};
