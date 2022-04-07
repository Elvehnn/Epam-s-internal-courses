function getTagObjectModel(tagString) {
	const content = tagString.match(/>(?<content>.*)?</);
	const tagContent = content ? content.groups.content : "undefined";

	const tag = tagString.match(/<((?<name>[a-z]+)\s*(?<attributes>[^>]*))>/);

	const tagName = tag.groups.name;
	const tagAttributes = tag.groups.attributes;

	const arrayOfAttributes = tagAttributes.split(" ").map((item) => {
		const results =
			item.match(/(?<name>\w+)="(?<value>.*?)"/) || item.match(/(?<name>\w+)/);

		const attribute = results.groups;

		return {
			attributeName: attribute.name,
			attributeValue: attribute.value || "undefined",
		};
	});

	return {
		tagName,
		arrayOfAttributes,
		tagContent,
	};
}
