function getTagObjectModel(tagString) {
	function getTagContent() {
		const content = tagString.match(/>(?<content>.*)?</);
		return content ? content.groups.content : "undefined";
	}

	function getTagName() {
		return tagString.match(/<((?<name>[a-z]+)\s*(?<attributes>[^>]*))>/).groups
			.name;
	}

	function getAllTagAttributes() {
		return tagString.match(/<((?<name>[a-z]+)\s*(?<attributes>[^>]*))>/).groups
			.attributes;
	}

	function getTagAttributesArray() {
		const tagAttributes = getAllTagAttributes();

		return tagAttributes.split(" ").map((item) => {
			const results =
				item.match(/(?<name>\w+)="(?<value>.*?)"/) ||
				item.match(/(?<name>\w+)/);

			const attribute = results.groups;

			return {
				attributeName: attribute.name,
				attributeValue: attribute.value || "undefined",
			};
		});
	}

	const tagContent = getTagContent();
	const tagName = getTagName();
	const arrayOfAttributes = getTagAttributesArray();

	return {
		tagName,
		arrayOfAttributes,
		tagContent,
	};
}
